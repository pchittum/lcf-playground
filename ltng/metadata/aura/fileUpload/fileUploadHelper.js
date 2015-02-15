({
    
    MAX_FILE_SIZE: 4 500 000, /* 6 000 000 * 3/4 to account for base64 */
    CHUNK_SIZE: 900 000, /* Use a multiple of 4 */

    save : function(component) {
        
        //console.log('start save in helper');

        var fileInput = component.find("file").getElement();
    	var file = fileInput.files[0];
   
        if (file.size > this.MAX_FILE_SIZE) {
            alert('File size cannot exceed ' + this.MAX_FILE_SIZE + ' bytes.\n' +
    		  'Selected file size: ' + file.size);
    	    return;
        }
    
        var fr = new FileReader();
        
        var self = this;
        //set event handler for onload event 
       	fr.onload = function() {
            var fileContents = fr.result;
    	    var base64Mark = 'base64,';
            var dataStart = fileContents.indexOf(base64Mark) + base64Mark.length;
 
            fileContents = fileContents.substring(dataStart);
        
    	    self.upload(component, file, fileContents);
        };
        
        //async read of file fires onload when successful
        fr.readAsDataURL(file);
    },
        
    upload: function(component, file, fileContents) {
        var fromPos = 0;
        var toPos = Math.min(fileContents.length, fromPos + this.CHUNK_SIZE);
        
        // start with the initial chunk
        this.uploadChunk(component, file, fileContents, fromPos, toPos, '');   
    },
    uploadChunk : function(component, file, fileContents, fromPos, toPos, attachId) {
        console.log('invoked chunk at ' + fromPos.toString() + ' to ' + toPos.toString());
        var action = component.get("c.saveTheChunk"); 
        var chunk = fileContents.substring(fromPos, toPos);

        action.setParams({
            parentId: component.get("v.parentId"),
            fileName: file.name,
            base64Data: encodeURIComponent(chunk), 
            contentType: file.type,
            fileId: attachId
        });
        //console.log(action);
       
        var self = this;
        action.setCallback(this, function(a) {
            //console.log('invoked callback on ' + a.getReturnValue());//currently we don't reach here
            console.log(a);
            if (a.state === 'ERROR'){
                var showToast = $A.get('e.force:showToast');
                showToast.setParams(
                    {
                        'title': a.state,
                        'message': ': error saving attachment'
                    }
                );
                showToast.fire();

            }

            attachId = a.getReturnValue();
            
            fromPos = toPos;
            toPos = Math.min(fileContents.length, fromPos + self.CHUNK_SIZE);    
            if (fromPos < toPos) {
                self.uploadChunk(component, file, fileContents, fromPos, toPos, attachId);  
            } else {
                //done
                var showToast = $A.get('e.force:showToast');
                showToast.setParams(
                    {
                        'title': 'Save Attachment: ',
                        'message': a.state
                    }
                );
                showToast.fire();

            }
        },'ALL');

        action.setExclusive();
        //console.log('enqueueing action');    
        $A.run(function() {
            $A.enqueueAction(action); 
        });

    }    
})