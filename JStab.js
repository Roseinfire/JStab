function JStab(area, gap, left=2) {   
        var val = area.value
        var res = ""
        var stage = 1
        var quote = 1
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
            var action = !intext && !incomment
            if(val[i] == "{" && action) { stage += 1 }
            else if(val[i] == "}" && action) { stage -= 1 }
            if(val[i] == "(" && action) { quote++ }
            else if(val[i] == ")" && action) { quote-- }
            var space = stage*gap
            if(incomment == "long") { space += left };
            (function tab() {
                if(val[i] == "\n" && action) { 
                    for(var e = i+1; e < val.length; e++) {
                        if(val[e] != " " || (e) == val.length-1) {
                            res += ("\n" + (" ").repeat(space)); i = e-1; break
                            }
                        }
                    com = true
                    }    
                else if(val[i] == "}" && val[i+1] != ")" && stage == 1 && action && quote == 1) { 
                    for(var e = i+1; e <= val.length; e++) {
                        if( (val[e] != ";" && val[e] != "\n" && val[e] != " ") || (e) == val.length) {
                            res += ("};\n\n" + (" ").repeat(left)); i = e-1; break
                            }
                        };
                    com = true
                    }
                if(com == null) { res += val[i] }
                })()  
            }
        if(val[0] != "\n") { res = "\n" + (" ").repeat(left) + res }
        if(val[val.length-1] != "\n") { res += "\n" }
        area.value = res
        if(stage > 1) { alert(`Expected to add ${(stage-1)} symbol(s) "}"`) }
        else if(stage < 1) { alert(`Expected to delete ${(stage+1)} symbol(s) "}"`) }
        if(quote > 1) { alert(`Expected to add ${(qoute-1)} symbol(s) ")"`) }
        else if(quote < 1) { alert(`Expected to delete ${(quote+1)} symbol(s) ")"`) }
        };
