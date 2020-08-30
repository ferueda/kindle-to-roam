const cleanMarkdown = text => {
	let newText;
	newText = text.replace(/#/gi, '');
	newText = newText.replace(/\\\[/g, '[');
	newText = newText.replace(/\\\]/g, ']');
	newText = newText.replace(/\*(?= {3})/g, ' ');
	newText = newText.replace(/\*\*(?=\w)/gi, '***');
	return newText;
};

export default cleanMarkdown;
