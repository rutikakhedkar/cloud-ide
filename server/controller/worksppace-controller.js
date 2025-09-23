// server.js
async function buildTree(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  const tree = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return {
          name: entry.name,
          type: "folder",
          children: await buildTree(fullPath), // recurse
        };
      } else {
        return {
          name: entry.name,
          type: "file",
        };
      }
    })
  );

  return tree;
}

const getFilesTree  = async (req, res) => {
  try {
    const stack = req.params.stack; // react | next | vue
    const stackPath = path.join(TEMPLATE_DIR, stack);

    if (!(await fs.pathExists(stackPath))) {
      return res.status(404).json({ error: "Stack not found" });
    }

    const fileTree = await buildTree(stackPath);
    res.json({ stack, fileTree });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports={getFilesTree}
