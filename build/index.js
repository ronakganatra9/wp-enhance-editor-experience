(()=>{"use strict";var e={n:t=>{var l=t&&t.__esModule?()=>t.default:()=>t;return e.d(l,{a:l}),l},d:(t,l)=>{for(var a in l)e.o(l,a)&&!e.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:l[a]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};const t=window.React,l=window.wp.element,a=window.wp.components,n=window.wp.apiFetch;var o=e.n(n);(0,l.render)((0,t.createElement)((function(){const[e,n]=(0,l.useState)(null),[r,i]=(0,l.useState)(!1);(0,l.useEffect)((()=>{o()({path:"/block-editor-settings/v1/settings"}).then((e=>n(e)))}),[]);const s=async e=>{i(!0);try{const t=await o()({path:"/block-editor-settings/v1/settings",method:"POST",data:e});n(t)}catch(e){console.error("Failed to save settings:",e)}i(!1)};return e?(0,t.createElement)("div",{className:"wrap"},(0,t.createElement)("h1",null,"Block Editor Settings"),(0,t.createElement)("div",{className:"block-editor-settings"},(0,t.createElement)(a.ToggleControl,{label:"Disable Pattern Directory",checked:e.disable_patterns,onChange:t=>s({...e,disable_patterns:t})}),(0,t.createElement)(a.ToggleControl,{label:"Disable Template Editor",checked:e.disable_template_editor,onChange:t=>s({...e,disable_template_editor:t})}),(0,t.createElement)(a.ToggleControl,{label:"Disable Code Editor",checked:e.disable_code_editor,onChange:t=>s({...e,disable_code_editor:t})}),(0,t.createElement)(a.TextControl,{label:"Max Upload File Size (bytes)",type:"number",value:e.max_upload_size,onChange:t=>s({...e,max_upload_size:parseInt(t)})}),(0,t.createElement)(a.SelectControl,{label:"Default Image Size",value:e.default_image_size,options:[{label:"Thumbnail",value:"thumbnail"},{label:"Medium",value:"medium"},{label:"Large",value:"large"},{label:"Full Size",value:"full"}],onChange:t=>s({...e,default_image_size:t})}),(0,t.createElement)(a.ToggleControl,{label:"Disable Openverse",checked:e.disable_openverse,onChange:t=>s({...e,disable_openverse:t})}),(0,t.createElement)(a.ToggleControl,{label:"Disable Font Library",checked:e.disable_font_library,onChange:t=>s({...e,disable_font_library:t})}),(0,t.createElement)(a.ToggleControl,{label:"Disable Inspector Tabs",checked:e.disable_inspector_tabs,onChange:t=>s({...e,disable_inspector_tabs:t})}),(0,t.createElement)(a.ToggleControl,{label:"Disable Block Directory",checked:e.disable_block_directory,onChange:t=>s({...e,disable_block_directory:t})}),(0,t.createElement)(a.ToggleControl,{label:"Disable Remote Patterns",checked:e.disable_remote_patterns,onChange:t=>s({...e,disable_remote_patterns:t})})),r&&(0,t.createElement)("div",null,"Saving...")):(0,t.createElement)("div",null,"Loading...")}),null),document.getElementById("block-editor-settings-app"))})();