function JStab(area, gap, left="") {   
      function gotab(s) {
            var tab = ""
            for(var i = 1; i < s; i++) {
                  tab += " "
                  }
            return left + tab
            }     
      var val = area.value
      var res = ""
      var stage = 1
      var intext = false
      var inht = false
      var incomment = false
      for(var i = 0; i < val.length; i++) {
            var com = null
    
            if(val[i] == "/" && val[i+1] == "*") { incomment = "long" }
            else if(val[i] == "/" && val[i+1] == "/") { incomment = "short" }    
            if(val[i] == "*" && val[i+1] == "/" && incomment == "long") { incomment = false }
            else if(val[i] == "\n" && incomment == "short") { incomment = false }   
    
            if( !incomment && (val[i] == "'" || val[i] == '"' || val[i] == "`") && !intext) { intext = val[i] }
            else if(intext == val[i]) { intext = false }
            if( val[i] == ">") { inht=true }
            else if( val[i] == "<" ) { inht = false }
            if(val[i] == "{" && !intext && !incomment) { stage += gap }
            else if(val[i] == "}" && !intext && !incomment) { stage -= gap }
            if(val[i] == "(" && !intext && !incomment) { /* stage += Math.floor(gap/2) */ }
            else if(val[i] == ")" && !intext && !incomment) { /* stage -= Math.floor(gap/2) */ }
            var space = stage  
            if(incomment == "long") { space = stage+3 }   
            if(val[i] == "\n") { 
                  for(var e = i+1; e < val.length; e++) {
                        if(val[e] != " ") {
                              res += ("\n" + gotab(space)); i = e-1; break
                              }
                        }
                  com = true
                  }    
            if(com == null) { res += val[i] }
          //  if(val[i] == ";" && stage == 1 && inht) { res += "\n" } 
            }
      if(res[res.length-1] != "\n") { res += "\n" }
      area.value = res
      if(stage > 1) { alert(`Expected another ${(stage-1)/gap} symbol(s) "}"`) }
      };
    