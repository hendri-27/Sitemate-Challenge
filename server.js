const express = require('express');
const app = express();
const port = 3000;

let issues = [
  { id: 1, title: "Issue 1", description: "This is a sample issue." },
  { id: 2, title: "Issue 2", description: "Another sample issue." }
];

// Create issue (POST) - Handle missing data
app.post('/issues', (req, res) => {
  const newIssue = req.body;
  console.log(newIssue);
  if (!newIssue.title || !newIssue.description) {
    return res.status(400).json({ message: "Missing required fields!" });
  }
  newIssue.id = issues.length + 1; // Generate unique ID
  issues.push(newIssue);
  console.log("Created Issue:", newIssue);
  res.json({ message: "Issue created successfully!" });
});

// Read all issues (GET)
app.get('/issues', (req, res) => {
  res.json(issues);
});

// Update issue (PUT) - Handle non-existent issue
app.put('/issues/:id', (req, res) => {
  const id = req.params.id;
  const updatedIssue = req.body;
  const index = issues.findIndex(issue => issue.id === parseInt(id));

  if (index !== -1) {
    issues[index] = updatedIssue;
    console.log("Updated Issue:", updatedIssue);
    res.json({ message: "Issue updated successfully!" });
  } else {
    res.status(404).json({ message: "Issue not found!" });
  }
});

// Delete issue (DELETE) - Handle non-existent issue
app.delete('/issues/:id', (req, res) => {
  const id = req.params.id;
  const index = issues.findIndex(issue => issue.id === parseInt(id));

  if (index !== -1) {
    issues.splice(index, 1);
    console.log("Deleted Issue with ID:", id);
    res.json({ message: "Issue deleted successfully!" });
  } else {
    res.status(404).json({ message: "Issue not found!" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
