import React from "react";

import { PostCreate, PostList } from "./components";

function App() {
  return (
    <div style={{ padding: 20 }} className="container">
      <PostCreate />
      <hr />
      <PostList />
    </div>
  );
}

export default App;
