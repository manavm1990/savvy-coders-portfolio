export default {
  heading: "Contact Page",
  main: `
  <form action="#" method="POST" data-netlify="true">
        <div class="flex-container--desktop flex-row--desktop">
        <div>
            <label for="name">Name:</label>
            <input type="text" name="name" id="name" pattern="[a-zA-Z]+[\s][a-zA-Z]+" placeholder="First Last">
          </div>

          <div>
            <label for="email">Email:</label>
            <input type="email" name="email" id="email" pattern="[a-zA-Z\d]+[@][a-zA-Z\d]+[.][a-zA-Z\d]+" placeholder="you@somedomain.com">
          </div>

          <div>
            <label for="fone">Phone:</label>
            <input type="tel" name="fone" id="fone" pattern="d{3}[-]d{3}[-]d{4}" placeholder="123-456-7890">
          </div>
        </div>

        <div>
          <label for="msg">Enter your message:</label>
          <textarea name="msg" id="msg" cols="30" rows="10"></textarea>
        </div>

        <input type="submit" value="Submit">
      </form>
  `
};
