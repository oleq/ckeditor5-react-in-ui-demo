import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from './classiceditor';

import './App.css';

function App() {
  return (
    <div className="App">
        <CKEditor
          editor={ ClassicEditor }
          data={ `
            <h2>Using React components in <a href="https://ckeditor.com">CKEditor 5</a> UI</h2>
            <p>This demo shows an integration between React components and CKEditor 5 UI. The entire application was created using <a href="https://create-react-app.dev/">create-react-app</a> and runs CKEditor 5 <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/advanced/alternative-setups/integrating-from-source.html">built from source</a>.</p>
            <p>Now, check out the last button in the toolbar that opens a font color dropdown 👆</p>
            <p>
              This custom dropdown hosts the <a href="http://casesandberg.github.io/react-color/"><code>react-color</code></a> component and
              uses the existing <a href="https://ckeditor.com/docs/ckeditor5/latest/api/module_font_fontcolor_fontcolorediting-FontColorEditing.html"><code>FontColorEditing</code></a> plugin and the <code>fontColor</code> command.
            </p>
            <p><span style="color:#00b724;">Use it </span><span style="color:#0064b7;">to change</span><span style="color:#00b724;"> </span><span style="color:#b7006d;">font color</span><span style="color:#00b724;"> </span><span style="color:#b78600;">in the editor</span><span style="color:#00b724;"> </span><span style="color:#00b1b7;">content</span>.
            </p><p>Enjoy 🙂</p>
          ` }
      />
    </div>
  );
}

export default App;
