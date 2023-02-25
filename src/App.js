import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';

import $ from 'jquery';
// Load wiris formula render script.
const jsDemoImagesTransform = document.createElement('script');
jsDemoImagesTransform.type = 'text/javascript';
jsDemoImagesTransform.src = 'https://www.wiris.net/demo/plugins/app/WIRISplugins.js?viewer=image';
document.head.appendChild(jsDemoImagesTransform);
// This needs to be included before the '@wiris/mathtype-tinymce6' is loaded synchronously
window.$ = $;
window.tinymce = require('tinymce');  // Expose the TinyMCE to the window.
// Load wiris plugin synchronously.
require('@wiris/mathtype-tinymce6');

function App() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <>
      <Editor
        apiKey='u2hb3m98pl4u91zvpvn86mpjzn9kyzr7npiysp5iffx7uh6c'
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: false,
          external_plugins: {
            'tiny_mce_wiris': `${window.location.href}/node_modules/@wiris/mathtype-tinymce6/plugin.min.js`
          },
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help | ' + 'tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry ',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          extended_valid_elements: '*[.*]',
        }}
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
}

export default App;
