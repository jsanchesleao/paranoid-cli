const {Command} = require('tbrex');
const inquirer = require('inquirer');
const {lockFile} = require('../files');

class LockCommand extends Command {

  async exec(args, out) {
    const file = args._[0];
    if (!file) {
      this.showHelp(out);
      return 1;
    }

    const password = args.password || args.p || (await this.requestPassword());
    const output = args.stdout ? process.stdout : null;

    try {
      await lockFile({file, password});
      return 0;
    }
    catch(err) {
      out.send('Error locking file');
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
      message: 'Enter a password to lock the file:'
    }])
    return password;
  }

  describe() {
    return 'locks a file with a password'
  }

  showHelp(out) {
    out.send(`usage: lock [ [-p | --password] <password>] <filepath>`)
  }

}

module.exports = LockCommand;
