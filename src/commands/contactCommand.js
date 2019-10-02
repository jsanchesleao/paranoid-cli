const {Command, Switcher} = require('tbrex');

class ContactCommand extends Command {

  async exec(args, out) {
    switch(args._[0]) {
      case 'add':
        return new AddContactCommand().exec(args, out)
      case 'rm':
        return new RemoveContactCommand().exec(args.out)
      default:
        return this.showHelp(out);
    }
  }

  describe() {
    return `manages your contacts and their public keys`
  }

  showHelp(out) {
    out.send('usage: command [add|rm] [--key <key>] [--name <name>]');
  }
}

class AddContactCommand extends Command {
  async exec(args, out) {
    const keyFile = args.key || args.k;
    const contactName = args.name || args.n;
    console.log(`adding public key ${keyFile} for user ${contactName}`)
  }
}

class RemoveContactCommand extends Command {
  async exec(args, out){
    const contactName = args.name || args.n;
    const key = args.key || args.k;
    console.log(`removing contact ${contactName} or key ${key}`);
  }
}

module.exports = ContactCommand;
