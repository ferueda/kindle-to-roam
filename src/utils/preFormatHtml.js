const formatTitle = node => `Book:: [[${node.textContent.trim()}]]`;
const formatAuthor = node => `Author:: [[${node.textContent.trim()}]]`;
const formatSectionHeading = node => `<strong>${node.textContent.trim()}</strong>`;
const formatNote = node => `<li>${node.textContent.trim()}</li>`;

const preFormatHtml = html => {
	const parser = new DOMParser();
	const highlightsAsDom = parser.parseFromString(html, 'text/html');

	// Clean head, styles and others
	highlightsAsDom.getElementsByTagName('head')[0].innerHTML = '';

	const notebookFor = highlightsAsDom.querySelector('.notebookFor');
	notebookFor.parentNode.removeChild(notebookFor);

	const bookTitle = highlightsAsDom.querySelector('.bookTitle');
	bookTitle.innerHTML = formatTitle(bookTitle);

	const bookAuthor = highlightsAsDom.querySelector('.authors');
	bookAuthor.innerHTML = formatAuthor(bookAuthor);

	const citation = highlightsAsDom.querySelector('.citation');
	citation.parentNode.removeChild(citation);

	const hrs = [...highlightsAsDom.getElementsByTagName('hr')];
	hrs.forEach(hr => hr.parentNode.removeChild(hr));

	const noteHeadings = [...highlightsAsDom.querySelectorAll('.noteHeading')];
	noteHeadings.forEach(heading => heading.parentNode.removeChild(heading));

	const sectionHeading = [...highlightsAsDom.querySelectorAll('.sectionHeading')];
	sectionHeading.forEach(heading => (heading.innerHTML = formatSectionHeading(heading)));

	const notes = [...highlightsAsDom.querySelectorAll('.noteText')];
	notes.forEach(note => (note.innerHTML = formatNote(note)));

	return highlightsAsDom;
};

export default preFormatHtml;
