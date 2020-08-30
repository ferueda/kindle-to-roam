import React from 'react';
import FileInput from './components/FileInput';
import Footer from './components/Footer';
import { ThemeProvider, CSSReset, Text, Link, Box } from '@chakra-ui/core';

function App() {
	return (
		<Box d="flex" flexDir="column" height="100vh">
			<ThemeProvider>
				<CSSReset />

				<Text as="h1" fontSize="6xl" fontWeight="bold" textAlign="center" mt="1rem">
					<a href="/">Kindle to Roam</a>
				</Text>
				<Text as="h2" fontSize="xl" fontWeight="500" textAlign="center" mt="0.5rem">
					Convert your Kindle book highlights into a friendly format for{' '}
					<Link color="blue.500" href="https://roamresearch.com/" isExternal>
						Roam Research
					</Link>
					.
				</Text>

				<FileInput />
				<Footer />
			</ThemeProvider>
		</Box>
	);
}

export default App;
