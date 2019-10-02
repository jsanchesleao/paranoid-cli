# Paranoid

This is a package I created for my safely store sensitive data files by encrypting them using a password based algorithm.

## Installation

```
$ npm install pnd -g
```

## Usage

Just running `pnd` will display the available commands and this will always be more up to date than any README file.

To lock a file with a password, run `pnd lock <filename>`. You will be requested to enter a password, and a file with the same name, but with a `.lock` extension will be created.

To unlock a `.lock` file, simply run `pnd unlock <lockedfile>`. Again, you will be requested to enter a password to unlock the file. It will create a file without the `.lock` extension and with the decrypted content.

To both commands, you can pass a `-p <password>` option. If you provide this option, you will not be prompted for a password, and the commands will run without requesting user interaction.

## Final Considerations

This is a tool I created for my own personal use. If by chance you might try it, do it at your own risk.
The only reason I wrote this documentation is because of my bad memory.

This being said, if you try it, you can send me feedback at <jsanchesleao@gmail.com>.

