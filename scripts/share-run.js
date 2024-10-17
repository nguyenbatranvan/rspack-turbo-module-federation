const { spawn } = require("node:child_process");
const fs = require("node:fs");
const { join } = require("path");

const args = process.argv.filter((item) => !item.includes("/"));
const projectName = args[0];
const opts = args.slice(1, args.length);
const filePath = join(process.cwd(), "apps/" + projectName + "/remote.json");

function fsReadFileSynchToArray(filePath) {
	const data = JSON.parse(fs.readFileSync(filePath));
	return data;
}

function shareRun(mode, readFile) {
	if (!readFile) {
		runScripts(mode, " --filter=" + projectName);
		return;
	}
	let arrLines = [];
	fs.stat(filePath, function (err, stat) {
		if (err === null) {
			arrLines = fsReadFileSynchToArray(filePath)
				.map((item) => "--filter=" + item)
				.join(" ");
			if (arrLines) {
				runScripts(mode, arrLines + " --filter=" + projectName);
			} else {
				runScripts(mode, " --filter=" + projectName);
			}
		} else {
			runScripts(mode, " --filter=" + projectName);
		}
	});
	return arrLines;
}

function runScripts(mode, projects) {
	console.log("mo", mode, projects, opts);
	if (!args || !args.length) {
		spawn("turbo", [mode, opts], {
			shell: true,
			stdio: "inherit",
		});
	} else {
		spawn("turbo", [mode, projects, opts], {
			shell: true,
			stdio: "inherit",
		});
	}
}

module.exports = {
	shareRun,
};
