const fs = require('fs');
const path = require('path');

function stripMarkdown(text) {
    return text.replace(/\*\*(.*?)\*\*/g, '$1')
               .replace(/\*(.*?)\*/g, '$1')
               .replace(/`(.*?)`/g, '$1')
               .trim();
}

function extractPracticesAndQuiz(mdContent) {
    const chapters = mdContent.split(/\n# Bab /).slice(1);
    const practices = [];
    let quiz = [];
    
    chapters.forEach((chap, idx) => {
        // Latihan
        const practiceMatch = chap.match(/## Latihan[^\n]*\n([\s\S]*?)(?=\n## |$)/);
        if (practiceMatch) {
            let promptText = practiceMatch[1].trim();
            // clean up paragraphs
            let paragraphs = promptText.split(/\n\n+/).map(p => p.trim()).filter(p => p);
            // remove any HTML tags just in case
            paragraphs = paragraphs.map(p => p.replace(/<[^>]+>/g, ''));
            if (paragraphs.length > 0) {
                practices.push({
                    id: "PRACTICE-" + (idx + 1),
                    prompt: paragraphs
                });
            }
        }
        
        // Kuis Akhir
        if (chap.toLowerCase().includes("kuis akhir")) {
            // Find numbered list with options
            const questionBlocks = chap.split(/\n(\d+)\.\s+/).slice(1); // [1, "Question\n - A... \n", 2, "Question..."]
            for (let i = 0; i < questionBlocks.length; i += 2) {
                const qNum = questionBlocks[i];
                const block = questionBlocks[i+1];
                const lines = block.split('\n');
                let questionText = lines[0].trim();
                let options = [];
                let explanation = "Penjelasan belum tersedia.";
                
                for (let j = 1; j < lines.length; j++) {
                    const line = lines[j].trim();
                    if (line.match(/^- [A-E]\.\s/)) {
                        options.push(stripMarkdown(line.replace(/^- [A-E]\.\s/, '').trim()));
                    } else if (line.length > 0 && !line.startsWith('-')) {
                        // Might be part of question if options haven't started
                        if (options.length === 0) {
                            questionText += " " + line;
                        }
                    }
                }
                
                if (options.length > 0) {
                    quiz.push([
                        stripMarkdown(questionText),
                        options,
                        0, // Default correct answer index
                        explanation
                    ]);
                }
            }
        }
    });
    
    // If no practices found, generate some dummy practices so it doesn't break
    if (practices.length === 0) {
        for(let i=0; i<5; i++) practices.push({ id: "P-" + i, prompt: ["Latihan belum tersedia."] });
    }
    
    // If no quiz found, generate dummy quiz
    if (quiz.length === 0) {
        quiz.push(["Kuis belum tersedia", ["Benar", "Salah"], 0, ""]);
    }
    
    return { practices, quiz };
}

const mdPath = process.argv[2];
if (!mdPath) {
    console.error("Usage: node mass_extractor.js <path-to-markdown>");
    process.exit(1);
}

const content = fs.readFileSync(mdPath, 'utf8');
const { practices, quiz } = extractPracticesAndQuiz(content);

const outPath = path.join(path.dirname(mdPath), path.basename(mdPath, '.md') + '_extracted.json');
fs.writeFileSync(outPath, JSON.stringify({ practices, quiz }, null, 4));
console.log("Extracted to", outPath);
