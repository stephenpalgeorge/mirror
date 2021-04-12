# Mirror

**Mirror is a library for checking your styles.**
When working on large projects, css can become difficult to manage. How confident are you that the change to that variable did/didn't update the button you wanted? And only the button you wanted?? Side affects can go unseen.

This can be exacerbated if you're using a preprocessor like Sass.
Sass is awesome, like, *really* awesome. But if you're iterating over a map of colours to generate countless `color` and `background` classes, how can you verify that, first of all, they got created as expected, with the expected names, and, secondly, that they actually produce the styles you intended? You could, of course, look at the compiled css and find the class you're looking for, but that quickly becomes laborious.
As your codebase grows, a change to a mixin could see dozens of classes redefined.

Mirror abstracts the checking process. Using pupetteer, your css will actually be rendered, like it will be in a browser, allowing you to programatically check that your css code is doing what you want it to do. Now, when you change your mixin, it's just a quick `node mirror` to check everything still looks how it should.
