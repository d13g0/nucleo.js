/*-------------------------------------------------------------------------
 This file is part of Nucleo.js

 Nucleo is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation version 3.

 Nucleo is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with Nucleo.  If not, see <http://www.gnu.org/licenses/>.
 ---------------------------------------------------------------------------*/

if (typeof(jQuery) == 'undefined') {
    nucleo.jquery = false;
    console.warn('JQuery is not available');
}
else {
    nucleo.jquery = true;
    console.info('JQuery is available');
}

/**
 * Ajax calls
 * @param params
 */
nucleo.ajax = function (params) {

    if (nucleo.jquery) {
        $.ajax(params);
        return;
    }

    //When JQuery is not present
    var response, request    = new XMLHttpRequest();

    request.open(params.type, params.url, true);

    if (params.mimeType !== undefined){
        request.overrideMimeType(params.mimeType);
    }

    request.onreadystatechange = function(){
        if (request.readyState == 4){
            if (params.dataType === 'json'){
                response = JSON.parse(request.responseText);
            }
            else{
                response = request.responseText;
            }
            params.success(response);
        }
    }

    request.onerror = function(){ params.error(request, request.status, request.statusText);}
    request.send();


};