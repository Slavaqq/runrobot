// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "runrobot is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.runRobot', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		try {

		if (vscode.window.activeTextEditor == null)
		{
			throw "No open file to run in robot!";
		}

		const activeFile = vscode.window.activeTextEditor.document;
		if (activeFile.languageId !== "python")
		{
			throw "The active file is not robot source code!";
		}

		const mainFunctionDefinitionReqEx = /^def\s*main\s*(.*?)\s*:/m; 
		if (activeFile.getText().search(mainFunctionDefinitionReqEx) === -1)
		{
			throw "The active file does not define main function!";
		}

		const runRobotConfig = vscode.workspace.getConfiguration("runRobot");
		const robotPath = runRobotConfig.get("robotPath");
		const activeFileName = activeFile.fileName;
		const robotTerminal = vscode.window.createTerminal("Robot", "cmd.exe");
		robotTerminal.show(true);
		robotTerminal.sendText(`"${robotPath}" "${activeFileName}"`);
		}

		catch (error_message) {
			vscode.window.showErrorMessage(error_message);
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
