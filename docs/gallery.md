# Gallery content

Each JSON file in `src/content/gallery/` is one gallery card. In the admin editor,
use Gallery to add a title and optional cover photo, then add entries to Gallery
Photos. Each photo has an image, alt text, optional caption, and optional larger
image. If no cover is provided, the first photo is used.

For a single photo, either use the cover/single-photo fields without adding a
list, or add just one entry to Gallery Photos. Single-photo viewers have no
previous/next controls or counter. Albums support buttons and Left/Right arrow
keys, wrapping at either end. Escape, the close button, or the backdrop closes
the viewer; focus returns to the album card.

The seven imported Wix collections contain 38 photos. Thumbnail and larger WebP
copies are stored in `public/images/gallery/`. Original source URLs and captions
are preserved in the JSON records. No Wix request is required to view the gallery.

Cards show an optional `uploadDate` as “Added Nov 2, 2026”. Use `YYYY-MM-DD`;
the date is formatted in UTC so it stays the same in every visitor's timezone.
The imported albums use their migration date, November 2, 2026, rather than an
unknown original Wix upload date. Set Date Added in the admin editor for future
albums; it defaults to the creation date and does not change on later edits.
