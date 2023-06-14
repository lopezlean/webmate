Create service worker to build the preview


Wrap components in the build the preview?

<webmate-componet-wrapper>
    <example-component></example-component>
</webmate-componet-wrapper>

We need to think about the iframe content

- What scripts to include
- what will happend when layout is build in for example wordpress 
- How we will manage the css in differents languages, php / js

--

Build class to convert from JSON to tags : we will need a php version for wordpress


---


Apply styles directly to the component ?
css{
    example-component{
        ...containerstyleshere
    }
}

css will be build in the worker


Worker tasks:
 build css
 build html
 


// we will change the approach, instead of have a service worker serving files we now will have a document instance for each build in this way:

// layout :: 
doc = document.implementation.createHTMLDocument("");
doc.open("replace");
doc.write("<html_string> layout content here");
doc.close();

/// after that see what we are doing on PageBuilder::buildDocument

That document should be servered by worker or service worker directly to the iframe wihout src attribute just using iframe.srcdoc = document.documentElement.


// controls
controls are just webcomponents
? check if they are controls ?
