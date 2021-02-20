(this["webpackJsonpchess-game"]=this["webpackJsonpchess-game"]||[]).push([[0],{179:function(e,t,n){},180:function(e,t,n){},209:function(e,t,n){},497:function(e,t,n){},498:function(e,t,n){},503:function(e,t,n){},505:function(e,t,n){},506:function(e,t,n){},507:function(e,t,n){"use strict";n.r(t);var r=n(2),c=n(0),a=n.n(c),o=n(13),u=n.n(o),i=(n(179),n.p,n(51)),s=n(7),l=(n(180),n(37)),b=n(6),m=n(510),h=n(511),f=n(78),j=n.n(f),d=(n(209),n(14)),p=n(21),g=n(23),O=n(22),v=function(){function e(t,n,r){Object(d.a)(this,e),this.startLocation=t,this.color=n,this.currentLocation=r||t,this.letters=["a","b","c","d","e","f","g","h"]}return Object(p.a)(e,[{key:"getPossibleMoves",value:function(){var e=this,t=this.letters.indexOf(this.currentLocation.letter),n=[];return this.moveChanges.forEach((function(r){var c={letter:e.letters[t+r.letter],number:e.currentLocation.number+r.number};c.letter&&c.number>=1&&c.number<=8&&n.push(c)})),n}},{key:"setCurrentLocation",value:function(e){this.currentLocation=e}}]),e}(),k=function(e){Object(g.a)(n,e);var t=Object(O.a)(n);function n(e,r,c){var a;return Object(d.a)(this,n),(a=t.call(this,e,r,c)).pieceType="pawn",a.moveChanges=[{letter:0,number:"black"==a.color?-1:1}],a}return Object(p.a)(n,[{key:"removeBlockedPaths",value:function(e,t){var n=this;console.log(e,t);var r=t;return e.forEach((function(e){if(e.letter!==n.currentLocation.letter)return!1;r=e.number>n.currentLocation.number?2===Math.abs(n.currentLocation.number-e.number)?r.filter((function(e){return 1===Math.abs(e.number-n.currentLocation.number)})):r.filter((function(t){return t.number>=e.number&&t.letter!==n.currentLocation.letter})):2===Math.abs(n.currentLocation.number-e.number)?r.filter((function(e){return 1===Math.abs(e.number-n.currentLocation.number)})):r.filter((function(t){return t.number<=e.number&&t.letter!==n.currentLocation.letter}))})),r}}]),n}(v),w=function(e){Object(g.a)(n,e);var t=Object(O.a)(n);function n(e,r,c){var a;return Object(d.a)(this,n),(a=t.call(this,e,r,c)).pieceType="knight",a.moveChanges=[{letter:2,number:1},{letter:1,number:2},{letter:-1,number:2},{letter:-2,number:1},{letter:-2,number:-1},{letter:-1,number:-2},{letter:1,number:-2},{letter:2,number:-1}],a}return n}(v),x=function(e){Object(g.a)(n,e);var t=Object(O.a)(n);function n(e,r,c){var a;Object(d.a)(this,n),(a=t.call(this,e,r,c)).pieceType="rook",a.moveChanges=[];for(var o=1;o<=7;o++)a.moveChanges.push({letter:o,number:0}),a.moveChanges.push({letter:-o,number:0}),a.moveChanges.push({letter:0,number:o}),a.moveChanges.push({letter:0,number:-o});return a}return Object(p.a)(n,[{key:"removeBlockedPaths",value:function(e,t){var n=this,r=t;return e.forEach((function(e){r=e.letter===n.currentLocation.letter?e.number>n.currentLocation.number?r.filter((function(t){return t.number<=e.number})):r.filter((function(t){return t.number>=e.number})):e.letter>n.currentLocation.letter?r.filter((function(t){return t.letter<=e.letter})):r.filter((function(t){return t.letter>=e.letter}))})),r}}]),n}(v),L=function(e){Object(g.a)(n,e);var t=Object(O.a)(n);function n(e,r,c){var a;Object(d.a)(this,n),(a=t.call(this,e,r,c)).pieceType="bishop",a.moveChanges=[];for(var o=1;o<=7;o++)a.moveChanges.push({letter:o,number:o}),a.moveChanges.push({letter:o,number:-o}),a.moveChanges.push({letter:-o,number:-o}),a.moveChanges.push({letter:-o,number:o});return a}return Object(p.a)(n,[{key:"removeBlockedPaths",value:function(e,t){var n=this,r=t;return e.forEach((function(e){r=e.number>n.currentLocation.number?e.letter>n.currentLocation.letter?r.filter((function(t){return t.letter<=e.letter||t.number<=e.number})):r.filter((function(t){return t.letter>=e.letter||t.number<=e.number})):e.letter>n.currentLocation.letter?r.filter((function(t){return t.letter<=e.letter||t.number>=e.number})):r.filter((function(t){return t.letter>=e.letter||t.number>=e.number}))})),r}}]),n}(v),y=function(e){Object(g.a)(n,e);var t=Object(O.a)(n);function n(e,r,c){var a;Object(d.a)(this,n),(a=t.call(this,e,r,c)).pieceType="queen",a.moveChanges=[];for(var o=1;o<=7;o++)a.moveChanges.push({letter:o,number:o}),a.moveChanges.push({letter:o,number:-o}),a.moveChanges.push({letter:-o,number:-o}),a.moveChanges.push({letter:-o,number:o}),a.moveChanges.push({letter:o,number:0}),a.moveChanges.push({letter:-o,number:0}),a.moveChanges.push({letter:0,number:o}),a.moveChanges.push({letter:0,number:-o});return a}return Object(p.a)(n,[{key:"removeBlockedPaths",value:function(e,t){var n=this,r=t;return e.forEach((function(e){console.log(r),console.log(e),e.letter===n.currentLocation.letter?(console.log("letters are same"),r=e.number>n.currentLocation.number?r.filter((function(t){return t.number<=e.number||t.letter!==n.currentLocation.letter})):r.filter((function(t){return t.number>=e.number||t.letter!==n.currentLocation.letter}))):e.number===n.currentLocation.number?(console.log("numbers are same"),r=e.letter>n.currentLocation.letter?r.filter((function(t){return t.letter<=e.letter||t.number!==n.currentLocation.number})):r.filter((function(t){return t.letter>=e.letter||t.number!==n.currentLocation.number}))):e.number>n.currentLocation.number?(console.log("upwards diagonal"),e.letter>n.currentLocation.letter?(console.log("up and right"),r=r.filter((function(t){return t.letter<=e.letter||t.number<e.number}))):(console.log("up and left"),r=r.filter((function(t){return t.letter>=e.letter||t.number<e.number})))):(console.log("downwards diagonal"),r=e.letter>n.currentLocation.letter?r.filter((function(t){return t.letter<=e.letter||t.number>e.number})):r.filter((function(t){return t.letter>=e.letter||t.number>e.number})))})),r}}]),n}(v),S=function(e){Object(g.a)(n,e);var t=Object(O.a)(n);function n(e,r,c){var a;return Object(d.a)(this,n),(a=t.call(this,e,r,c)).pieceType="king",a.moveChanges=[{letter:0,number:-1},{letter:0,number:1},{letter:1,number:0},{letter:1,number:1},{letter:1,number:-1},{letter:-1,number:0},{letter:-1,number:1},{letter:-1,number:-1}],a}return Object(p.a)(n,[{key:"removeBlockedPaths",value:function(e,t){var n=t;return e.forEach((function(e){n=n.filter((function(t){return t.letter!==e.letter||t.number!==e.letter}))})),n}}]),n}(v),N=["a","b","c","d","e","f","g","h"];var C=function(){for(var e=[],t=0;t<8;t++){var n=new k({letter:N[t],number:2},"white");e.push(n)}for(var r=0;r<8;r++){var c=new k({letter:N[r],number:7},"black");e.push(c)}var a=[new w({letter:"b",number:1},"white"),new w({letter:"g",number:1},"white"),new w({letter:"b",number:8},"black"),new w({letter:"g",number:8},"black")],o=[new x({letter:"a",number:1},"white"),new x({letter:"h",number:1},"white"),new x({letter:"a",number:8},"black"),new x({letter:"h",number:8},"black")],u=[new L({letter:"c",number:1},"white"),new L({letter:"f",number:1},"white"),new L({letter:"c",number:8},"black"),new L({letter:"f",number:8},"black")],i=[new y({letter:"d",number:1},"white"),new y({letter:"d",number:8},"black")],s=[new S({letter:"e",number:1},"white"),new S({letter:"e",number:8},"black")];return[].concat(i,u,o,a,e,s)},R=function(e,t,n){var r=e.getPossibleMoves();if("pawn"===e.pieceType)if("white"===e.color&&2===e.currentLocation.number?r.push({letter:e.currentLocation.letter,number:4}):"black"===e.color&&7===e.currentLocation.number&&r.push({letter:e.currentLocation.letter,number:5}),"white"===e.color)t.filter((function(t){var n=t.currentLocation,r=n.letter,c=n.number,a=N.indexOf(e.currentLocation.letter),o=N[a-1],u=N[a+1];return(r===o||r===u)&&c===e.currentLocation.number+1})).forEach((function(e){return r.push(e.currentLocation)}));else if("black"===e.color){t.filter((function(t){var n=t.currentLocation,r=n.letter,c=n.number,a=N.indexOf(e.currentLocation.letter),o=N[a-1],u=N[a+1];return(r===o||r===u)&&c===e.currentLocation.number-1})).forEach((function(e){return r.push(e.currentLocation)}))}var c=[],a=r.filter((function(n){for(var r=0;r<t.length;r++){var a=t[r];if(a.currentLocation.letter===n.letter&&a.currentLocation.number===n.number){if("knight"===e.pieceType)return a.color!==e.color;if(a.color===e.color)return c.push(a.currentLocation),!1;if(a.color!==e.color)return c.push(a.currentLocation),!0}}return!0}));return c.length>0&&(a=e.removeBlockedPaths(c,a)),a},P=function(e){var t=[];return e.forEach((function(e){var n=e.startLocation,r=e.color,c=e.currentLocation;switch(e.pieceType){case"bishop":t.push(new L(n,r,c));break;case"king":t.push(new S(n,r,c));break;case"knight":t.push(new w(n,r,c));break;case"pawn":t.push(new k(n,r,c));break;case"queen":t.push(new y(n,r,c));break;case"rook":t.push(new x(n,r,c))}})),t},T=(n(210),C),G=P,E=R,U={rook:'<i class="fas fa-chess-rook piece-icon"></i>',knight:'<i class="fas fa-chess-knight piece-icon"></i>',bishop:'<i class="fas fa-chess-bishop piece-icon"></i>',queen:'<i class="fas fa-chess-queen piece-icon"></i>',king:'<i class="fas fa-chess-king piece-icon"></i>',pawn:'<i class="fas fa-chess-pawn piece-icon"></i>'},q=["a","b","c","d","e","f","g","h"];function B(e){var t=e.roomId,n=e.teamRef,a=e.teamState,o=e.socket,u=e.isSocketConnected,i=(e.usernameRef,e.usernameState,e.teamUpRef),s=(e.teamUpState,e.setTeamUp),l=(e.watchers,e.isGameActiveRef),m=e.isGameActiveState,h=e.updatePiecesTaken,f=e.gamePendingHeading,j=e.gamePendingButtonText,d=e.handleOverlayButtonClick,p=(e.setGamePendingHeading,e.setGamePendingButtonText,Object(c.useState)(window.innerWidth)),g=Object(b.a)(p,2),O=g[0],v=g[1],k=Object(c.useState)([]),w=Object(b.a)(k,2),x=w[0],L=w[1],y=Object(c.useRef)([]),S=Object(c.useRef)([]),N=function(e){S.current=e,S.current.length>0&&y.current.length>0&&J()},C=Object(c.useRef)({}),R=function(e){C.current=e},P=Object(c.useRef)([]),B=function(e){P.current=e,document.querySelectorAll(".square-available-circle").forEach((function(e){e.style.opacity=0})),P.current.forEach((function(e){document.querySelector("[data-location=".concat(e.letter+e.number,"]")).children[0].style.opacity=.6}))};Object(c.useEffect)((function(){S.current.length<1&&N(T()),window.addEventListener("resize",(function(){v(window.innerWidth)}))}),[]),Object(c.useEffect)((function(){o.current&&(o.current.on("opponentMove",(function(e){console.log("opponent has moved"),I(e.startLocation,e.endLocation),"white"===i.current?s("black"):"black"===i.current&&s("white")})),o.current.on("roomJoined",(function(e){if(D("white"),e.pieces.length>0){var t=G(e.pieces);N(t)}})),o.current.on("resetGame",(function(){N(T())})))}),[u]),Object(c.useEffect)((function(){console.log("should create board for team ",a),"white"===a||"watcher"===a?D("white"):"black"===a&&D("black")}),[a]),Object(c.useEffect)((function(){var e;x.length>0&&S.current.length>0&&(e=x,y.current=e,J(),console.log("creating click event listeners"))}),[x]);var M=function(e){return S.current.filter((function(t){var n=t.currentLocation,r=n.letter,c=n.number;return r===e.letter&&c===e.number}))[0]},W=function(e,t){M(e).currentLocation={letter:t.letter,number:t.number}},A=function(e){return S.current.filter((function(t){var n=t.currentLocation,r=n.letter,c=n.number;return r!==e.letter||c!==e.number}))},I=function(e,t){console.log("start location: ",e);var n=M(e);console.log(S.current);var r=M(t);if(r){var c=A(t);W(n.currentLocation,t),N(c),h(r)}else n.setCurrentLocation({letter:t.letter,number:t.number}),J()},D=function(e){for(var t=[],n=!0,c=function(e){q.forEach((function(c){t.push(Object(r.jsxs)("div",{className:n?"board-square square-light":"board-square square-dark","data-letter":c,"data-number":e,"data-location":c+e,children:[Object(r.jsx)("div",{className:"square-available-circle"}),Object(r.jsx)("div",{className:"square-clickable",onClick:F})]})),"h"!==c&&(n=!n)}))},a=8;a>0;a--)c(a);return"black"===e&&(t=t.reverse()),console.log("setting board squares state"),L(t)},J=function(){console.log("rendering pieces"),document.querySelectorAll(".piece-icon-container").forEach((function(e){e.remove()})),S.current.forEach((function(e){var t=e.currentLocation.letter+e.currentLocation.number,n=document.querySelector("[data-location=".concat(t,"]")),r=document.createElement("div");r.innerHTML=U[e.pieceType],r.className="piece-icon-container "+"icon-container-".concat(e.color),n.appendChild(r)})),document.querySelectorAll(".square-available-circle").forEach((function(e){e.style.opacity=0})),R({}),B([]),u&&(console.log("updating pieces on server"),o.current.emit("piecesUpdate",{pieces:S.current,teamUp:i.current}))},F=function(e){if(console.log("click"),i.current===n.current&&l.current){var t=e.target.parentElement.getAttribute("data-letter"),r=parseInt(e.target.parentElement.getAttribute("data-number")),c=M({letter:t,number:r}),a=M(C.current),u=!(!a||!c)&&a.color===c.color;console.log(c),!a||u||a.currentLocation.letter===t&&a.currentLocation.number===r?c?!a||t===a.currentLocation.letter&&r===a.currentLocation.number?a&&t===a.currentLocation.letter&&r===a.currentLocation.number?(B([]),R({})):a||c.color!==n.current?console.log("user is on a different team than selected piece"):(R({letter:t,number:r}),B(E(c,S.current))):(R({letter:t,number:r}),B(E(c,S.current))):console.log("nothing is happening"):function(e,t){var r=M(t);if(0===P.current.filter((function(e){return e.letter===t.letter&&e.number===t.number})).length)return!1;if(o.current.emit("userMovedPiece",{startLocation:e.currentLocation,endLocation:t}),"black"===i.current?s("white"):"white"===i.current&&s("black"),r){var c=A(t);W(e.currentLocation,t),N(c),h(r),o.current.emit("pieceTaken",r),"king"===r.pieceType&&o.current.emit("kingTaken",n.current)}else e.setCurrentLocation({letter:t.letter,number:t.number}),J()}(a,{letter:t,number:r})}else console.log("you are not up")};return Object(r.jsxs)("div",{className:"board",style:O<850?{height:"".concat(O,"px")}:{height:"850px"},children:[Object(r.jsx)("div",{className:"board-squares-wrapper",style:O<850?{fontSize:"".concat(O/8*.8,"px")}:{fontSize:"".concat(85,"px")},children:x.map((function(e){return e}))}),Object(r.jsx)("div",{className:"pending-game-overlay".concat(m?"":" show-pending-overlay"),children:Object(r.jsxs)("div",{className:"pending-game-text-container",children:[Object(r.jsx)("h2",{className:"pending-game-header",children:f}),Object(r.jsx)("p",{children:"Invite your friends!  Send them your current url or have them join with the room's ID of ".concat(t)}),!(!j||"watcher"===a)&&Object(r.jsx)("button",{className:"btn btn-primary pending-game-button",onClick:d,children:j})]})})]})}n(497);var M={rook:Object(r.jsx)("i",{class:"fas fa-chess-rook taken-piece-icon"}),knight:Object(r.jsx)("i",{class:"fas fa-chess-knight taken-piece-icon"}),bishop:Object(r.jsx)("i",{class:"fas fa-chess-bishop taken-piece-icon"}),queen:Object(r.jsx)("i",{class:"fas fa-chess-queen taken-piece-icon"}),king:Object(r.jsx)("i",{class:"fas fa-chess-king taken-piece-icon"}),pawn:Object(r.jsx)("i",{class:"fas fa-chess-pawn taken-piece-icon"})};function W(e){var t=e.socket,n=e.isSocketConnected,a=e.teamRef,o=(e.teamState,e.whitePiecesTakenState),u=e.blackPiecesTakenState,i=e.whiteUsername,s=e.blackUsername,l=e.usernameRef,m=e.usernameState,h=e.watchers,f=e.roomId,j=e.toggleMobileMenu,d=Object(c.useState)(!1),p=Object(b.a)(d,2),g=p[0],O=p[1];Object(c.useEffect)((function(){t.current&&t.current.on("userWantsDraw",(function(){"white"!==a.current&&"black"!==a.current||O(!0)}))}),[n]);var v=function(e){console.log("you answered draw with ",e),O(!1),e&&t.current.emit("userAcceptsDraw")};return Object(r.jsxs)("div",{className:"player-aside-container",children:[Object(r.jsx)("span",{className:"mobile-menu-exit",onClick:j,children:"\xd7"}),Object(r.jsxs)("div",{className:"player-btns",style:"watcher"!==a.current?{}:{display:"none"},children:[Object(r.jsx)("button",{onClick:function(){t.current.emit("userWantsDraw")},children:"Draw"}),Object(r.jsx)("button",{onClick:function(){t.current.emit("resign",{username:l.current,team:a.current})},children:"Resign"})]}),Object(r.jsxs)("div",{className:"draw-question-wrapper",style:g&&"watcher"!==a.current?{}:{display:"none"},children:[Object(r.jsx)("p",{children:"Would you like to call it a draw?"}),Object(r.jsx)("button",{className:"draw-btn-yes",onClick:function(){return v(!0)},children:"Yes"}),Object(r.jsx)("button",{className:"draw-btn-no",onClick:function(){return v(!1)},children:"No"})]}),Object(r.jsxs)("div",{className:"player-info-container",children:[Object(r.jsxs)("h3",{className:"player-username",children:[Object(r.jsxs)("span",{children:[Object(r.jsx)("i",{class:"fas fa-chess-king team-icon icon-white"})," "]}),i?i===m?"You":i:"No Player"]}),Object(r.jsx)("div",{className:"taken-pieces-container taken-pieces-black",children:u.map((function(e){return Object(r.jsx)("div",{className:"taken-piece-container",children:M[e]})}))})]}),Object(r.jsxs)("div",{className:"player-info-container",children:[Object(r.jsxs)("h3",{className:"player-username",children:[Object(r.jsxs)("span",{children:[Object(r.jsx)("i",{class:"fas fa-chess-king team-icon icon-black"})," "]}),s?s===m?"You":s:"No Player"]}),Object(r.jsx)("div",{className:"taken-pieces-container taken-pieces-white",children:o.map((function(e){return Object(r.jsx)("div",{className:"taken-piece-container",children:M[e]})}))})]}),Object(r.jsxs)("div",{className:"spectators-container",children:[Object(r.jsx)("h3",{children:"Spectators"}),Object(r.jsx)("div",{className:"spectators-flex",children:h.map((function(e){return Object(r.jsxs)("p",{className:"spectator-name",children:[e===l.current?"You":e,Object(r.jsx)("span",{children:"white"===a.current||"black"===a.current?Object(r.jsx)("button",{className:"btn btn-primary trade-place-btn",onClick:function(){return n=e,void t.current.emit("givingSpotToSpectator",{user:{username:l.current,team:a.current},spectator:n});var n},children:"Trade Places"}):""})]})}))})]}),Object(r.jsx)("p",{className:"room-id-text",children:Object(r.jsxs)("strong",{children:["Room ID: ",f]})})]})}n(498);function A(e){var t=Object(s.f)(),n=e.toggleMobileMenu,c=e.handleLeaveGame;return Object(r.jsxs)("header",{className:"game-header",children:[Object(r.jsxs)("h1",{onClick:function(){return t.push("/")},children:[Object(r.jsx)("i",{class:"fas fa-chess-king header-icon"})," 1-2-3 Chess"]}),Object(r.jsxs)("div",{className:"responsive-header-btns",children:[Object(r.jsx)("button",{className:"leave-room-btn btn btn-danger",onClick:c,children:"Leave Room"}),Object(r.jsx)("i",{className:"fas fa-bars menu-icon",onClick:n})]})]})}n(503);var I="".concat("https://chess-123-server.herokuapp.com","/game");function D(){var e=Object(s.f)(),t=Object(s.g)().room,n=Object(c.useRef)(!1),a=Object(c.useState)(!0),o=Object(b.a)(a,2),u=o[0],i=o[1],f=Object(c.useState)(""),d=Object(b.a)(f,2),p=d[0],g=d[1],O=Object(c.useState)(!1),v=Object(b.a)(O,2),k=v[0],w=v[1],x=Object(c.useState)("Waiting for Second Player"),L=Object(b.a)(x,2),y=L[0],S=L[1],N=Object(c.useRef)("Waiting for Second Player"),C=function(e){N.current=e,S(e),console.log("pending heading updated")},R=Object(c.useState)(""),P=Object(b.a)(R,2),T=P[0],G=P[1],E=Object(c.useRef)(""),U=function(e){E.current=e,G(e)},q=Object(c.useState)([]),M=Object(b.a)(q,2),D=M[0],J=M[1],F=Object(c.useRef)([]),H=function(e){J(e),F.current=e},Y=Object(c.useState)(""),z=Object(b.a)(Y,2),K=z[0],Q=z[1],V=Object(c.useRef)(""),X=function(e){V.current=e,Q(e)},Z=Object(c.useState)(""),$=Object(b.a)(Z,2),_=$[0],ee=$[1],te=Object(c.useRef)(""),ne=function(e){te.current=e,ee(e)},re=Object(c.useState)(""),ce=Object(b.a)(re,2),ae=ce[0],oe=ce[1],ue=Object(c.useRef)(""),ie=function(e){ue.current=e,oe(e)},se=Object(c.useState)([]),le=Object(b.a)(se,2),be=le[0],me=le[1],he=Object(c.useRef)([]),fe=function(e){he.current=e,me(e)},je=Object(c.useState)([]),de=Object(b.a)(je,2),pe=de[0],ge=de[1],Oe=Object(c.useRef)([]),ve=function(e){Oe.current=e,ge(e)},ke=Object(c.useState)(),we=Object(b.a)(ke,2),xe=we[0],Le=we[1],ye=Object(c.useRef)(),Se=function(e){ye.current=e,Le(e)},Ne=Object(c.useState)(!1),Ce=Object(b.a)(Ne,2),Re=Ce[0],Pe=Ce[1],Te=Object(c.useRef)(!1),Ge=function(e){console.log("game status updated to ",e),Te.current=e,Pe(e),Fe.current.emit("gameStatusChange",e)},Ee=Object(c.useState)("none"),Ue=Object(b.a)(Ee,2),qe=Ue[0],Be=Ue[1],Me=Object(c.useRef)("none"),We=function(e){Me.current=e,Be(e),Fe.current.emit("updateTeamUp",e)},Ae=Object(c.useState)(!1),Ie=Object(b.a)(Ae,2),De=Ie[0],Je=Ie[1],Fe=Object(c.useRef)();Object(c.useEffect)((function(){var r;r=j()(I),Fe.current=r,Je(!0),Fe.current.on("connect",(function(e){console.log("connected to game name space"),Fe.current.emit("joinRoom",t)})),Fe.current.on("roomJoined",(function(e){console.log("room joined ",e),ie(e.blackPlayer),ne(e.whitePlayer),We(e.teamUp),H(e.watchers),fe(e.whitePiecesTaken),ve(e.blackPiecesTaken),Ge(e.gameStatus)})),Fe.current.on("noRoomFound",(function(){e.push("/")})),Fe.current.on("usernameCreated",(function(e){e&&(i(!u),X(e.username),"white"===e.color?(Se("white"),ne(e.username)):"black"===e.color?(Se("black"),ie(e.username)):(Se("watcher"),console.log("setting watchers to ",[].concat(Object(l.a)(D),[e.username])),H([].concat(Object(l.a)(F.current),[e.username]))),te.current&&ue.current&&C("Game Ready to Begin"))})),Fe.current.on("usernameTaken",(function(){g("Username Taken")})),Fe.current.on("newPlayerJoined",(function(e){"white"===e.color?ne(e.username):"black"===e.color?ie(e.username):(console.log("new user joined, watchers: ",[].concat(Object(l.a)(D),[e.username])),H([].concat(Object(l.a)(F.current),[e.username]))),console.log(N.current),"Waiting for Second Player"===N.current?(C("Game Ready to Begin"),U("Start Game")):"User Left, Waiting for New Player"===N.current&&(C("New User Joined"),U("Resume Game"))})),Fe.current.on("startGame",(function(e){"none"===Me.current&&(console.log("team should be updated"),We(e)),U(""),Ge(!0),n.current=!0})),Fe.current.on("gameOver",(function(e){var t=e.charAt(0).toUpperCase()+e.slice(1);C(t+" Wins"),U("Start New Game"),Ge(!1)})),Fe.current.on("gameIsDraw",(function(){Ge(!1),C("Game is a Draw"),U("Start New Game")})),Fe.current.on("resetGame",(function(){fe([]),ve([]),We("white"),Ge(!0)})),Fe.current.on("resumeGame",(function(){Ge(!0)})),Fe.current.on("userLeft",(function(e){var t=e.team,r=e.username;console.log("user left",e),"white"===t?(ne(""),Ge(!1),n.current?C("User Left, Waiting for New Player"):C("Waiting for Second Player")):"black"===t?(ie(""),Ge(!1),n.current?C("User Left, Waiting for New Player"):C("Waiting for Second Player")):H(F.current.filter((function(e){return e!==r})))})),Fe.current.on("userTakingOver",(function(e){Ge(!0),console.log("user taking over: ",e),"white"===e.team?ne(e.username):"black"===e.team&&ie(e.username),V.current===e.username&&Se(e.team),H(F.current.filter((function(t){return t!==e.username})))})),Fe.current.on("userResigned",(function(e){console.log(e);var t=e.team.charAt(0).toUpperCase()+e.team.slice(1),n="white"===e.team?"Black":"White";Ge(!1),C("".concat(t," Resigned, ").concat(n," Wins")),U("Start New Game")})),Fe.current.on("playerSpectatorTrade",(function(e){var t=e.user,n=e.spectator,r=F.current.filter((function(e){return e!==n}));r.push(t.username),H(r),"white"===t.team?ne(n):"black"===t.team&&ie(n),t.username===V.current?Se("watcher"):n===V.current&&Se(t.team)})),window.onbeforeunload=function(){Fe.current.emit("leaveGame",{username:V.current,team:ye.current})}}),[]);var He=function(){w(!k)};return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(A,{toggleMobileMenu:He,handleLeaveGame:function(){Fe.current.emit("leaveGame",ye.current),e.push("/")}}),Object(r.jsxs)("div",{className:"content-wrapper",children:[Object(r.jsx)("div",{className:"game-main-content bg-dark",children:Object(r.jsx)(B,{roomId:t,teamRef:ye,teamState:xe,socket:Fe,usernameState:K,usernameRef:V,teamUpRef:Me,teamUpState:qe,setTeamUp:We,isSocketConnected:De,isGameActiveRef:Te,isGameActiveState:Re,updatePiecesTaken:function(e){"white"===e.color?fe([].concat(Object(l.a)(he.current),[e.pieceType])):"black"===e.color&&ve([].concat(Object(l.a)(Oe.current),[e.pieceType]))},gamePendingHeading:y,setGamePendingHeading:C,gamePendingButtonText:T,setGamePendingButtonText:U,handleOverlayButtonClick:function(e){var t=e.target.innerText;console.log(t),"Start Game"===t?Fe.current.emit("beginGame"):"Resume Game"===t?(Ge(!0),U(""),Fe.current.emit("resumeGame")):"Start New Game"===t&&Fe.current.emit("startNewGame")}})}),Object(r.jsx)("div",{className:"game-aside-content".concat(k?" show":""),children:Object(r.jsx)(W,{roomId:t,teamRef:ye,teamState:xe,whitePiecesTakenRef:he,whitePiecesTakenState:be,blackPiecesTakenRef:Oe,blackPiecesTakenState:pe,whiteUsername:_,blackUsername:ae,usernameRef:V,usernameState:K,watchers:D,socket:Fe,isSocketConnected:De,toggleMobileMenu:He})})]}),Object(r.jsxs)(m.a,{show:u,onHide:function(){i(!u)},backdrop:"static",keyboard:!1,children:[Object(r.jsx)(m.a.Header,{children:Object(r.jsx)(m.a.Title,{children:"Create a Username"})}),Object(r.jsxs)(m.a.Body,{children:[Object(r.jsx)("input",{type:"text",className:"form-control",value:K,placeholder:"Username",onChange:function(e){var t=e.target.value;X(t)}}),Object(r.jsx)("p",{className:"username-help",children:p})]}),Object(r.jsx)(m.a.Footer,{children:Object(r.jsx)(h.a,{variant:"primary",onClick:function(){g(""),Fe.current.emit("createUsername",V.current)},children:"Let's Go"})})]})]})}n(505);function J(){return Object(r.jsx)("header",{className:"home-page-header",children:Object(r.jsxs)("h1",{children:[Object(r.jsx)("i",{class:"fas fa-chess-king piece-icon"})," 1-2-3 Chess"]})})}n(506);function F(){var e=Object(s.f)(),t=Object(c.useState)(!1),n=Object(b.a)(t,2),a=n[0],o=n[1],u=Object(c.useRef)();Object(c.useEffect)((function(){var t;t=j()("https://chess-123-server.herokuapp.com"),u.current=t,u.current.on("connect",(function(){console.log("connected")})),u.current.on("newRoomCreated",(function(t){console.log("created room "+t),o(!1),e.push("/game/"+t)})),u.current.on("allowRoomJoin",(function(t){e.push("/game/"+t)}))}),[]);return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("div",{className:"home-bg-white"}),Object(r.jsx)(J,{}),Object(r.jsx)("div",{className:"home-bg-div"}),Object(r.jsxs)("div",{className:"home-content-wrapper",children:[Object(r.jsxs)("div",{className:"new-room-wrapper",children:[Object(r.jsx)("h2",{children:"Create New Room"}),Object(r.jsx)("button",{className:"btn btn-primary new-room-btn",onClick:function(){o(!0),u.current.emit("createNewRoom")},children:"Create New Room"}),Object(r.jsx)("i",{className:"fad fa-spinner-third".concat(a?" show":"")})]}),Object(r.jsxs)("div",{className:"join-room-wrapper",children:[Object(r.jsx)("h2",{children:"Join Existing Room"}),Object(r.jsxs)("form",{className:"join-room-form",onSubmit:function(e){e.preventDefault();var t=e.target.children[0].value;u.current.emit("joinExistingRoom",t)},children:[Object(r.jsx)("input",{className:"form-control",type:"text",placeholder:"Room ID"}),Object(r.jsx)("button",{className:"btn btn-primary join-room-btn",children:"Join"})]})]})]})]})}var H=function(){return Object(r.jsx)("div",{className:"App",children:Object(r.jsx)(i.a,{basename:"/chess-game",children:Object(r.jsxs)(s.c,{children:[Object(r.jsx)(s.a,{exact:!0,path:"/",children:Object(r.jsx)(F,{})}),Object(r.jsx)(s.a,{exact:!0,path:"/game/:room",children:Object(r.jsx)(D,{})})]})})})},Y=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,512)).then((function(t){var n=t.getCLS,r=t.getFID,c=t.getFCP,a=t.getLCP,o=t.getTTFB;n(e),r(e),c(e),a(e),o(e)}))};u.a.render(Object(r.jsx)(a.a.StrictMode,{children:Object(r.jsx)(H,{})}),document.getElementById("root")),Y()}},[[507,1,2]]]);
//# sourceMappingURL=main.cd75187f.chunk.js.map