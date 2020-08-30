import React, { useState, useRef, useEffect } from 'react';
import { Button, Tooltip, Box, Text } from '@chakra-ui/core';
import TurndownService from 'turndown';
import ReactMarkdown from 'react-markdown';
import copy from 'copy-to-clipboard';
import cleanMarkdown from '../utils/cleanMarkdown';
import preFormatHtml from '../utils/preFormatHtml';
import './FileInput.css';

const FileInput = () => {
	const [file, setFile] = useState(null);
	const [markdown, setMarkdown] = useState(null);
	const [tooltipIsOpen, setTooltipIsOpen] = useState(false);
	const [error, setError] = useState(null);

	const inputRef = useRef(null);

	const handleFileRead = event => {
		const files = event.target.files;

		if (files[0] && files[0].type !== 'text/html') {
			inputRef.current.value = '';

			setTimeout(() => {
				setError(null);
			}, 2000);
			return setError({ code: 'fileType', message: 'Please select a valid file' });
		}

		if (files[0]) {
			setFile(null);
			setMarkdown(null);
			setError(null);

			const fileReader = new FileReader();

			fileReader.onloadend = e => {
				const content = fileReader.result;

				setFile(content);
			};

			fileReader.readAsText(files[0]);
		}
	};

	const handleConvertion = () => {
		const turndownService = new TurndownService();

		setMarkdown(turndownService.turndown(preFormatHtml(file)));
	};

	const handleCopyToClipboard = () => {
		setTooltipIsOpen(true);
		copy(cleanMarkdown(markdown), { format: 'text/plain' });

		setTimeout(() => {
			setTooltipIsOpen(false);
		}, 1000);
	};

	return (
		<Box display="flex" flexDir="column" alignItems="center" alignContent="center" width="100%" maxW="1000px" mx="auto">
			<form>
				<input type="file" ref={inputRef} onChange={event => handleFileRead(event)} hidden />
				<Button d="flex" mx="auto" size="lg" variantColor="blue" onClick={() => inputRef.current.click()} mt="2rem">
					Select a File
				</Button>

				{error ? (
					<Text textAlign="center" fontSize="1.1rem" fontWeight="500" color="red.400" mt="1rem">
						{error.message}
					</Text>
				) : null}
			</form>
			<Box
				width="90%"
				mx="auto"
				border="2px solid"
				borderColor="gray.200"
				borderRadius="md"
				d="flex"
				justifyContent="center"
				p="1rem"
				my="2rem"
				px="2rem"
			>
				{file !== null && markdown === null ? (
					<Box px="-2rem">
						<Button size="sm" variant="outline" d="flex" ml="auto" variantColor="blue" onClick={handleConvertion}>
							Convert
						</Button>
						<Box mt="-1rem">
							<div dangerouslySetInnerHTML={{ __html: file }} />
						</Box>
					</Box>
				) : null}

				{file === null && markdown === null ? (
					<Text fontWeight="500" color="gray.500" fontSize="1.25rem" my="2rem">
						No File Selected
					</Text>
				) : null}

				{markdown !== null ? (
					<Box>
						<Tooltip isOpen={tooltipIsOpen} label="Copied!">
							<Button
								d="flex"
								ml="auto"
								size="sm"
								variant="outline"
								variantColor="blue"
								onClick={handleCopyToClipboard}
							>
								Copy to Clipboard
							</Button>
						</Tooltip>
						<Box mt="1rem">
							<ReactMarkdown className="list" source={markdown} />
						</Box>
					</Box>
				) : null}
			</Box>
		</Box>
	);
};

export default FileInput;
