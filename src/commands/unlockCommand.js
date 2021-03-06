const {Command} = require('tbrex');
const inquirer = require('inquirer');
const {unlockFile} = require('../files');

class UnlockCommand extends Command {

  async exec(args, out) {
    const file = args._[0];
    if (!file) {
      this.showHelp(out);
      return 1;
    }

    const password = args.password || args.p || (await this.requestPassword());
    const output = args.stdout ? process.stdout : null;
    try {
      await unlockFile({file, password, output});
      return 0;
    }
    catch(err) {
      out.send('error unlocking file');
      if (args.v) {
        out.send(err);
      }
      return 1;
    }
  }

  async requestPassword() {
    const {password} = await inquirer.prompt([{
      type: 'password',
      name: 'password',
      message: 'Enter the password to unlock the file:'
    }])
    return password;
  }

  describe() {
    return 'unlocks a file that was previously locked with a password'
  }

  showHelp(out) {
    out.send(`usage: unlock [ [-p | --password] <password>] <filepath>`)
  }

}

module.exports = UnlockCommand;
