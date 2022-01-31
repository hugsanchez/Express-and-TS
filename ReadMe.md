CONS OF TYPE DEFINITION FILES
-Type definition files alone can't express what is going on in the JS world accurately (example:middleware)
-Type definition files provided to us aren't always accurate

-EXACERBATED BY THE TYPE DEFINITION FILE
--inputs to a server (or any program with external inputs) are not guaranteed to exist or be of the correct type

PROS OF TYPE DEFINITION FILES
-Addressing these type issues with TypeScript can force us to write better code

Editing the type definition file never good idea
-dependency to project edits get deleted

METADATA

- Essentially a snippet of information that can be tied to a method on a class, a property on a class, or a class definition itself
  (Essentially any kind of object)

- Can be used for super custom stuff
- TS will (optionally) provide type information as metadata
  (normally when we convert TS to JS all the TS code gets wiped away but this optinal feature exports some type information)
- Proposed feature to be added to JS (and thus TS)
- Read and written using the reflect-metadata package
