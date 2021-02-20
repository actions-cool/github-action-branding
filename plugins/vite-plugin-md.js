import Markdown from 'markdown-it'

const MD = Markdown()

function test(){
  return {
    name: 'mdToExportTemplate',
    transform(code, id) {
      if(id.endsWith('.md')) {
        const template = MD.render(code)
        return {
          code: `const template = ${JSON.stringify(template)};\nexport default template`,
          map: null
        }
      }
    },
  };
};

export default test