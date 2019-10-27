import axios from "axios";

export default st => {
  axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then(response => {
      /**
       * Is the `length` or response.data actually different from what we already have?
       * If not, let's trigger the SET TRAP in the PROXY.
       *
       * TODO: Apply `every()` and
       * 'deep compare' the post OBJECT LITERALS to see if they have changed.
       */
      if (st.posts.length !== response.data.length) {
        st.posts = response.data.map(({ title, body }) => ({
          title: title,
          body: body
        }));
      }
    })
    .catch(err => console.log(err));

  if (st.isAuth) {
    alert(`This is tacky way to check auth. BTW U are authorized!
      Also, this will check auth each time it renders this page, so after the posts are loaded, you will see this again!
    `);
  } else {
    alert(`
      This is tacky way to check auth. BTW U are NOT authorized!
      Also, this will check auth each time it renders this page, so after the posts are loaded, you will see this again!
    `);
  }
};
