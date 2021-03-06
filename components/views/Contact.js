export default () => `
  <form action="#" method="POST" data-netlify="true" class="form--contact">
    <div class="flex-container--tablet flex-row--tablet">
      <div>
        <label for="name">Name:</label>
        <input type="text" name="name" id="name" pattern="[a-zA-Z]+[ ]+[a-zA-Z]+" placeholder="First Last">
      </div>

      <div>
        <label for="email">Email:</label>
        <input type="email" name="email" id="email" pattern="[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.][a-zA-Z0-9]+" placeholder="you@somedomain.com">
      </div>

      <div>
        <label for="fone">Phone:</label>
        <input type="tel" name="fone" id="fone" pattern="[0-9]{3}[-][0-9]{3}[-][0-9]{4}" placeholder="123-456-7890">
      </div>
    </div>

    <div>
      <label for="msg">Enter your message:</label>
      <textarea name="msg" id="msg" cols="30" rows="10"></textarea>
    </div>

    <input type="submit" value="Submit">
  </form>
`;
