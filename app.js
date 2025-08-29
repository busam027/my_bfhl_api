const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Replace with your info
const full_name = "john_doe";
const email = "john@xyz.com";
const roll_number = "ABCD123";
const dob = "17091999"; // ddmmyyyy

// Helper function: alternate caps
function alternateCaps(str) {
    let result = '';
    let makeUpper = true;
    for (let char of str) {
        if (/[a-zA-Z]/.test(char)) {
            result += makeUpper ? char.toUpperCase() : char.toLowerCase();
            makeUpper = !makeUpper;
        }
    }
    return result;
}

app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data;
        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: "Input should be an array." });
        }

        let even_numbers = [];
        let odd_numbers = [];
        let alphabets = [];
        let special_characters = [];
        let sum = 0;
        let concat_str = '';

        data.forEach(item => {
            const strItem = String(item);
            if (/^\d+$/.test(strItem)) { // number
                const num = parseInt(strItem);
                sum += num;
                if (num % 2 === 0) {
                    even_numbers.push(strItem);
                } else {
                    odd_numbers.push(strItem);
                }
            } else if (/^[a-zA-Z]+$/.test(strItem)) { // alphabets
                alphabets.push(strItem.toUpperCase());
                concat_str += strItem;
            } else { // special character
                special_characters.push(strItem);
            }
        });

        // Reverse and alternate caps for concat_string
        const reversedConcat = alternateCaps(concat_str.split('').reverse().join(''));

        const response = {
            is_success: true,
            user_id: `${full_name}_${dob}`,
            email: email,
            roll_number: roll_number,
            odd_numbers: odd_numbers,
            even_numbers: even_numbers,
            alphabets: alphabets,
            special_characters: special_characters,
            sum: sum.toString(),
            concat_string: reversedConcat
        };

        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ is_success: false, message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
