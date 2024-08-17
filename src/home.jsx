import React from "react";

const passwordList = () => {
  return (
    <div>
      <div>password1</div>
      <div>password2</div>
      <div>password3</div>
    </div>
  );
};

function Home() {
  return (
    <div>
      <div>Search bar</div>
      <div> add new password</div>
      <passwordList />
    </div>
  );
}

export default Home;
