const axios = require('axios');

exports.getAIAnswer = async (question) => {
    // Call to OpenAI
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: "gpt-3.5-turbo",
        messages: [
                {"role": "user", "content": question},
                // {"role": "user", "content": "Knock knock."},
                // {"role": "assistant", "content": "Who's there?"},
                // {"role": "user", "content": "Orange."}
            ],
        max_tokens: 50,
        temperature: 0.7
    }, {
        headers: {
            'Authorization':  `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type' :  'application/json'
        }
    });

    return response.data.choices[0].message.content;
}

// exports.getAIAnswer = async (question) => {
//     // Call to OpenAI
//     const response = await axios.post('https://api.anthropic.com/v1/complete', {
//         prompt: question,
//         max_tokens: 50,
//         model: 'claude-v1', // Specify the model
//         temperature: 0.7,
//     }, {
//         headers: {
//             'Authorization':  `Bearer ${process.env.ANTHROPIC_API_KEY}`,
//             'Content-Type' :  'application/json'
//         }
//     });

//     return response.data.completion.trim();
// }