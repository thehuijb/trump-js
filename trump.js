/**
 * Trump v 0.0.1
 * @author Thehuijb
 *
 * Makes am great again
 */
(function () {
    // all the node types we're interested in
    var nodes = 'strong,em,p,h1,h2,h3,h4,h5,h6,li,div,blockquote,cite,dt,label,legend,q,sub,sup,td,td,body'.split(',');
    
    // make America great
    var am = document.createElement('em');
    am.style.color = '#c00';
    am.style.fontWeight = 'bold';
    am.style.textDecoration = 'none';
    am.style.fontSize = '3em';
    am.appendChild(t('America'));

    function t(s) {
        return document.createTextNode(s);
    }

    var america = /(\America)/ig,
        i = nodes.length, 
        j = 0, k = 0, l = 0, 
        source = '', 
        parts = [], 
        el = null, frag = null;
    
    while (i--) {
        el = document.getElementsByTagName(nodes[i]);
        j = el.length;
        while (j--) {
            k = el[j].childNodes.length;
            while (k--) {
                if (el[j].childNodes[k].nodeName == '#text' && america.test(el[j].childNodes[k].nodeValue)) {
                    source = el[j].childNodes[k].nodeValue;
                    
                    // we need markers to handle IE not including the split token
                    if (/^(America)/i.test(source)) {
                        source = '__MARKER__' + source;
                    }
                    
                    if (/(America)$/i.test(source)) {
                        source = source + '__MARKER__';
                    }
                    
                    parts = source.split(/(America)/i);
                    frag = document.createDocumentFragment();
                    l = 0;
                    
                    for (l = 0; l < parts.length; l++) {
                        if (america.test(parts[l])) {
                            continue; // For Safari + FF because IE sucks :-(
                        }
                        if (parts[l] != '__MARKER__') {
                            frag.appendChild(t(parts[l]));
                            
                            if (l != parts.length - 1) {
                                frag.appendChild(am.cloneNode(true));
                            }
                        } else if (l == 0 && parts[l] == '__MARKER__'){
                            frag.appendChild(am.cloneNode(true));
                        }
                    }

                    el[j].replaceChild(frag, el[j].childNodes[k]);
                }                
            }
        }
        
    }
})();