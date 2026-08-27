/**
 * VANSH KAUSHAL - DEVELOPER PORTFOLIO
 * Interactive Hero CLI Terminal & Multi-Tab Code Switcher
 */

document.addEventListener('DOMContentLoaded', () => {
  const terminalTabs = document.querySelectorAll('.terminal-tab');
  const terminalCodeContent = document.getElementById('terminal-code-content');
  const terminalCliOutput = document.getElementById('terminal-cli-output');
  const terminalCliForm = document.getElementById('terminal-cli-form');
  const terminalCliInput = document.getElementById('terminal-cli-input');

  if (!terminalTabs.length || !terminalCodeContent) return;

  const fileSnippets = {
    'terminal.sh': `
<div class="cli-block">
  <span class="cli-prompt">vansh@lpu:~$</span> <span class="string">whoami</span>
  <div class="code-output">
    <strong class="text-primary">Vansh Kaushal</strong><br>
    <span class="text-secondary">2nd-Year B.Tech CSE @ Lovely Professional University, Punjab</span><br>
    <span class="text-cyan">Focus: C++, Python, DSA, DBMS &amp; Web Development</span>
  </div>
  <span class="cli-prompt">vansh@lpu:~$</span> <span class="string">cat status.txt</span>
  <div class="code-output text-cyan">
    [✓] Strengthening Data Structures &amp; Algorithms<br>
    [✓] Exploring Machine Learning &amp; AI Workflows<br>
    [✓] Relational Databases &amp; SQL Query Optimization<br>
    [✓] Building Clean &amp; Responsive Web Solutions
  </div>
</div>`,

    'about.cpp': `
<pre style="margin: 0; color: #cbd5e1; font-family: var(--font-mono); font-size: 0.84rem;">
<span class="comment">// Vansh Kaushal Profile Definition</span>
<span class="keyword">#include</span> <span class="string">&lt;iostream&gt;</span>
<span class="keyword">#include</span> <span class="string">&lt;vector&gt;</span>
<span class="keyword">#include</span> <span class="string">&lt;string&gt;</span>
<span class="keyword">using namespace</span> std;

<span class="keyword">class</span> <span class="type">StudentDeveloper</span> {
<span class="keyword">public:</span>
    string name = <span class="string">"Vansh Kaushal"</span>;
    string university = <span class="string">"Lovely Professional University"</span>;
    string degree = <span class="string">"B.Tech CSE"</span>;
    <span class="type">int</span> currentYear = <span class="number">2</span>;
    vector&lt;string&gt; coreStack = {<span class="string">"C++"</span>, <span class="string">"Python"</span>, <span class="string">"DSA"</span>, <span class="string">"DBMS"</span>, <span class="string">"SQL"</span>, <span class="string">"Web"</span>};

    <span class="type">void</span> <span class="func">codeEveryday</span>() {
        cout &lt;&lt; <span class="string">"Continuous learning, problem solving, and building practical projects.\n"</span>;
    }
};
</pre>`,

    'skills.json': `
<pre style="margin: 0; color: #cbd5e1; font-family: var(--font-mono); font-size: 0.84rem;">
{
  <span class="keyword">"developer"</span>: <span class="string">"Vansh Kaushal"</span>,
  <span class="keyword">"degree"</span>: <span class="string">"B.Tech Computer Science &amp; Engineering"</span>,
  <span class="keyword">"university"</span>: <span class="string">"Lovely Professional University"</span>,
  <span class="keyword">"languages"</span>: [<span class="string">"C"</span>, <span class="string">"C++"</span>, <span class="string">"Python"</span>, <span class="string">"JavaScript"</span>],
  <span class="keyword">"web"</span>: [<span class="string">"HTML5"</span>, <span class="string">"CSS3"</span>, <span class="string">"JavaScript"</span>],
  <span class="keyword">"database"</span>: [<span class="string">"MySQL"</span>, <span class="string">"DBMS"</span>, <span class="string">"SQL"</span>],
  <span class="keyword">"coreCS"</span>: [<span class="string">"Data Structures &amp; Algorithms"</span>, <span class="string">"OOP"</span>, <span class="string">"Computer Networks"</span>, <span class="string">"Problem Solving"</span>],
  <span class="keyword">"tools"</span>: [<span class="string">"Git"</span>, <span class="string">"GitHub"</span>, <span class="string">"VS Code"</span>]
}
</pre>`,

    'ml_model.py': `
<pre style="margin: 0; color: #cbd5e1; font-family: var(--font-mono); font-size: 0.84rem;">
<span class="comment"># Student Performance Predictor Workflow</span>
<span class="keyword">import</span> numpy <span class="keyword">as</span> np
<span class="keyword">from</span> sklearn.model_selection <span class="keyword">import</span> train_test_split
<span class="keyword">from</span> sklearn.linear_model <span class="keyword">import</span> LinearRegression

<span class="comment"># Data preparation &amp; Model training</span>
X_train, X_test, y_train, y_test = train_test_split(features, target, test_size=<span class="number">0.2</span>)
model = LinearRegression()
model.fit(X_train, y_train)

accuracy = model.score(X_test, y_test)
print(f<span class="string">"Predictive model trained successfully with score: {accuracy:.2f}"</span>)
</pre>`
  };

  // Switch tabs
  terminalTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      terminalTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const fileName = tab.getAttribute('data-file');
      if (fileSnippets[fileName]) {
        terminalCodeContent.innerHTML = fileSnippets[fileName];
      }
    });
  });

  // CLI Command Logic
  const cliCommands = {
    help: () => `
<div class="code-output">
  <span class="text-cyan">Available commands:</span><br>
  - <span class="keyword">whoami / about</span> : View Vansh's background<br>
  - <span class="keyword">skills</span> : View technical tech stack<br>
  - <span class="keyword">projects</span> : View showcase projects<br>
  - <span class="keyword">education</span> : View academic timeline<br>
  - <span class="keyword">learning</span> : View current technical focuses<br>
  - <span class="keyword">contact</span> : View direct contact info<br>
  - <span class="keyword">clear</span> : Clear terminal screen
</div>`,

    whoami: () => `
<div class="code-output">
  <strong class="text-primary">Vansh Kaushal</strong><br>
  2nd Year B.Tech Computer Science &amp; Engineering student at Lovely Professional University, Punjab, India.<br>
  Aspiring Software Engineer passionate about C++, Python, DSA, DBMS, and Web Development.
</div>`,

    about: () => cliCommands.whoami(),

    skills: () => `
<div class="code-output">
  <strong class="text-cyan">Technical Arsenal:</strong><br>
  • <span class="keyword">Languages:</span> C, C++, Python, JavaScript<br>
  • <span class="keyword">Web:</span> HTML5, CSS3, JavaScript<br>
  • <span class="keyword">Database:</span> MySQL, DBMS, SQL<br>
  • <span class="keyword">Core CS:</span> Data Structures &amp; Algorithms, OOP, Computer Networks, Problem Solving<br>
  • <span class="keyword">Tools:</span> Git, GitHub, VS Code
</div>`,

    projects: () => `
<div class="code-output">
  <strong class="text-cyan">Showcase Projects:</strong><br>
  1. <strong>Student Performance Predictor</strong> (Python, ML, Scikit-learn)<br>
  2. <strong>Face Recognition System</strong> (Python, OpenCV, Deep Learning)<br>
  3. <strong>NLP Chatbot</strong> (Python, NLP)<br>
  4. <strong>Student Management System</strong> (C++, OOP, File I/O)<br>
  5. <strong>DSA Explorer</strong> (C++, Algorithms)
</div>`,

    education: () => `
<div class="code-output">
  <strong class="text-cyan">Academic History:</strong><br>
  • <strong>Lovely Professional University:</strong> B.Tech CSE (2025–2029) • 2nd Year<br>
  • <strong>DAV Public School:</strong> Class 12 Science (2024–2025) • 79%<br>
  • <strong>Army Public School, Jalandhar Cantt:</strong> Class 10 (2021–2022) • 80%
</div>`,

    learning: () => `
<div class="code-output">
  <strong class="text-cyan">Currently Learning:</strong><br>
  • C++ &amp; Data Structures (Algorithmic problem solving)<br>
  • DBMS &amp; SQL (Relational database design &amp; query optimization)<br>
  • Python &amp; Web Development (Applied software engineering)<br>
  • AI / Machine Learning (Foundational ML concepts)
</div>`,

    contact: () => `
<div class="code-output">
  <strong class="text-cyan">Get in Touch:</strong><br>
  • Email: <a href="mailto:kaushalvansh089@gmail.com" class="text-cyan">kaushalvansh089@gmail.com</a><br>
  • Phone: <a href="tel:+918264245616" class="text-cyan">+91 8264245616</a><br>
  • LinkedIn: <a href="https://www.linkedin.com/in/vansh-kaushal-6034b9393/" target="_blank" class="text-cyan">linkedin.com/in/vansh-kaushal-6034b9393/</a><br>
  • GitHub: <a href="https://github.com/assistant-rshi567" target="_blank" class="text-cyan">github.com/assistant-rshi567</a>
</div>`,

    clear: () => {
      if (terminalCliOutput) terminalCliOutput.innerHTML = '';
      return '';
    }
  };

  terminalCliForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!terminalCliInput || !terminalCliOutput) return;

    const inputVal = terminalCliInput.value.trim().toLowerCase();
    if (!inputVal) return;

    const commandItem = document.createElement('div');
    commandItem.className = 'cli-executed-block';
    commandItem.style.marginBottom = '0.75rem';

    const promptLine = `<span class="cli-prompt">vansh@lpu:~$</span> <span class="string">${escapeHtml(inputVal)}</span>`;

    let responseHtml = '';
    if (cliCommands[inputVal]) {
      responseHtml = cliCommands[inputVal]();
    } else {
      responseHtml = `<div class="code-output" style="color: var(--accent-red); margin-top: 0.25rem;">Command not found: "${escapeHtml(inputVal)}". Type <span class="keyword">help</span> for a list of commands.</div>`;
    }

    if (inputVal !== 'clear') {
      commandItem.innerHTML = promptLine + responseHtml;
      terminalCliOutput.appendChild(commandItem);
    }

    terminalCliInput.value = '';
    const terminalBody = document.querySelector('.terminal-body');
    if (terminalBody) {
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  });

  function escapeHtml(string) {
    return String(string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
});
