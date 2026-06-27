function run(argv) {
  var fm = $.NSFileManager.defaultManager;
  var path = fm.currentDirectoryPath + "/" + (argv[0] || "demo/src/app.js");
  
  // Read file contents using Objective-C bridge
  var data = fm.contentsAtPath(path);
  if (!data) {
    console.log("File not found: " + path);
    return;
  }
  
  var nsStr = $.NSString.alloc.initWithDataEncoding(data, $.NSUTF8StringEncoding);
  if (!nsStr) {
    console.log("Failed to decode file as UTF-8");
    return;
  }
  
  var str = nsStr.js;
  
  try {
    // Compile the JS code without executing it by using the Function constructor
    Function(str);
    console.log("SUCCESS: JS Syntax is valid!");
  } catch (e) {
    console.log("ERROR: JS Syntax check failed!");
    console.log(e.toString());
    if (e.stack) {
      console.log(e.stack);
    }
  }
}
