export default () => `
    <form action="#" method="POST" data-netlify="true">
        <div class="flex-container--desktop flex-row--desktop">
        <div>
            <label for="name">Name:</label>
            <input type="text" name="name" id="name">
          </div>

          <div>
            <label for="email">Email:</label>
            <input type="email" name="email" id="email">
          </div>

          <div>
            <label for="fone">Phone:</label>
            <input type="tel" name="fone" id="fone">
          </div>
        </div>

        <div>
          <label for="msg">Enter your message:</label>
          <textarea name="msg" id="msg" cols="30" rows="10"></textarea>
        </div>

        <input type="submit" value="Submit">

      </form>
`;
