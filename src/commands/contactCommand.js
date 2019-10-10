const {Command, Switcher} = require('tbrex');

class ContactCommand extends Command {

  constructor() {
    super();
    this.switcher = new Switcher({
      prompt: 'contact commands:',
      options: {
        'add': new AddContactCommand(),
        'rm': new RemoveContactCommand()
      }
    });
  }

  async exec(args, out) {
    this.switcher.run(args);
  }

  describe() {
    return `manages your contacts and their public keys`
  }
}

class HelpContactCommand extends Command {
  async exec(args, out) {
    out.send('usage: contact [add|rm] [--key <key>] [--name <name>]');
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
