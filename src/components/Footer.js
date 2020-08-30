import React from 'react';
import { Box, Text, Link } from '@chakra-ui/core';

const Footer = () => {
	return (
		<Box w="100%" d="flex" justifyContent="center" justifyItems="center" mt="auto" mb="0.5rem">
			<Text>
				Made with ❤ by&nbsp;
				<Link href="https://twitter.com/ferueda" isExternal>
					Felipe Rueda
				</Link>
			</Text>
		</Box>
	);
};

export default Footer;
