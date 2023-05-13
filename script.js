let wordLengthChart;
let sentenceLengthChart;

function analyze() {
    // Count the number of commas

    const original_text = document.getElementById('textInput').value;
    const text = original_text.replace(/[,\/#!$%\^&\*;:{}=\-_`~()\[\]]/g,"");
    const words = text.split(/\s+/);
    const sentences = text.split(/[.!?]+/);

    const commaCount = (original_text.match(/,/g) || []).length;
    document.getElementById('commaCount').innerText = `Comma Count: ${commaCount}`;

    // Count the total number of words
    const totalWordCount = words.length;
    document.getElementById('wordCount').innerText = `Total Word Count: ${totalWordCount}`;



    const wordLengthCounts = [0, 0, 0];
    words.forEach(word => {
        if (word.length >= 1 && word.length <= 4) {
            wordLengthCounts[0]++;
        } else if (word.length >= 5 && word.length <= 8) {
            wordLengthCounts[1]++;
        } else if (word.length > 8) {
            wordLengthCounts[2]++;
        }
    });

    const sentenceLengthCounts = [];
    sentences.forEach(sentence => {
        const trimmedSentence = sentence.trim();
        if (trimmedSentence !== "") {
            const length = trimmedSentence.split(/\s+/).length;
            sentenceLengthCounts[length] = (sentenceLengthCounts[length] || 0) + 1;
        }
    });

    if (wordLengthChart) {
        wordLengthChart.data.datasets[0].data = wordLengthCounts;
        wordLengthChart.update();
    } else {
        wordLengthChart = createHistogram('wordLengthChart', ['1-4', '5-8', '>8'], wordLengthCounts);
    }

    if (sentenceLengthChart) {
        sentenceLengthChart.data.labels = Array.from({length: sentenceLengthCounts.length}, (_, i) => i);
        sentenceLengthChart.data.datasets[0].data = sentenceLengthCounts;
        sentenceLengthChart.update();
    } else {
        sentenceLengthChart = createHistogram('sentenceLengthChart', Array.from({length: sentenceLengthCounts.length}, (_, i) => i), sentenceLengthCounts);
    }
}

function createHistogram(id, labels, data) {
    return new Chart(document.getElementById(id), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Count',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
