import * as fs from 'fs';
import * as readline from 'readline';
import * as path from 'path';

// File paths
const inputFilePath = path.join(__dirname, 'input.txt');
const outputFilePath = path.join(__dirname, 'valid_emails.txt');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Function to filter valid email addresses
async function filterValidEmails() {
    try {
        // Create a readable stream
        const fileStream = fs.createReadStream(inputFilePath);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });

        const validEmails: string[] = [];

        // Read file line by line and validate emails
        for await (const line of rl) {
            if (emailRegex.test(line.trim())) {
                validEmails.push(line.trim());
            }
        }

        // Write valid emails to output file
        fs.writeFileSync(outputFilePath, validEmails.join('\n'), 'utf-8');
        console.log(`Valid emails written to: ${outputFilePath}`);
    } catch (err) {
        console.error('Error processing files:', err);
    }
}

// Run the function
filterValidEmails();
