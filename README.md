## Obsidian UID link

### Description

Plugin does (should do) several things:
- [x] Open notes using [Obsidian URI](https://help.obsidian.md/Advanced+topics/Using+obsidian+URI) and note UID.
  - [ ] Customize the frontmatter field which used for navigation
- [ ] Create UID for notes

### Why it was made
When you want to link an obsidian note from the external program you have an option to use Obsidian URI link like this:

```
obsidian://open?vault=Test&file=Text
```

But what happens when you change the file name? You should rename all your links across all your external program. 
This plugins adds ability to open notes by checking their frontmatter fields:

```
obsidian://open-by-uid?uid=123
```

### How to install
1. Take the zip file (named like `mrj-note-uid-0.0.1.zip`) from [the latest release](https://github.com/mrjackphil/obsidian-note-uid/releases/latest)
2. Unpack it in `.obsidian/plugins` inside your Obsidian vault.
3. Reload Obsidian. 
4. You should see a new plugin in the Community Plugins section. Enable it.

### How it works
1. Add a frontmatter `id` field to one of your note.
2. Open url like: `obsidian://open-by-uid?uid=123` from the extrnal program where `123` is the note id which you put in the note.
3. It should open the note with that id. 

### Related
- You can see more discussions about it on [Obsidian forum](https://forum.obsidian.md/t/uuid-for-note-links-in-url-scheme/14617)
