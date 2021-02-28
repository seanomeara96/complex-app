the post document is the document that should be stored in the databse. mongo will accept anything but ideally it will have a rigid structure so that a relational database can be adopted in the future:

- document id
- data
	- title!
	- body!
	- author!
	- publish data/time!
	- last update date/time
	- weather?
	- images?
	- location?
- metadata
	- tags
	- template used?