# Violin Notes Quiz App

A fun, interactive web app to help young violin students learn note recognition on the musical staff and connect notes to violin technique.

## Features

- **Staff Reading Practice**: Shows notes on the treble clef staff
- **Dual Question Types**: 
  - "What note is this?" - Learn note names (A, B, C, D, E, F#)
  - "What string and finger?" - Learn violin technique (A0, A1, A2, D0, D1, D2)
- **Kid-Friendly Design**: Bright colors, large buttons, playful font
- **Score Tracking**: Progress saved locally using localStorage
- **Fully Offline**: No internet required after initial setup

## How to Use

1. Open `index.html` in any modern web browser
2. The app will show a staff image with a note
3. Answer either:
   - **Note name**: A, B, C, D, E, F#
   - **String and finger**: A0 (open A), A1 (A string 1st finger), A2 (A string 2nd finger), D0 (open D), D1 (D string 1st finger), D2 (D string 2nd finger)
4. Get immediate feedback and see your score

## Setup

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- PNG images for each note (see `/img/README.txt`)

### Installation
1. Clone or download this repository
2. Add your note images to the `/img/` folder:
   - `treble_a.png` - Note A
   - `treble_b.png` - Note B
   - `treble_c.png` - Note C
   - `treble_d.png` - Note D
   - `treble_e.png` - Note E
   - `treble_f_sharp.png` - Note F#
3. Open `index.html` in your browser

## Project Structure

```
violin_notes/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Kid-friendly styling
├── js/
│   └── main.js         # Quiz logic and game engine
├── img/                # Staff note images
│   ├── treble_a.png
│   ├── treble_b.png
│   ├── treble_c.png
│   ├── treble_d.png
│   ├── treble_e.png
│   └── treble_f_sharp.png
└── audio/              # Audio files (optional)
    └── README.txt
```

## Note to String/Finger Mapping

| Note | String | Finger | Code |
|------|--------|--------|------|
| A    | A      | Open   | A0   |
| B    | A      | 1st    | A1   |
| C    | A      | 2nd    | A2   |
| D    | D      | Open   | D0   |
| E    | D      | 1st    | D1   |
| F#   | D      | 2nd    | D2   |

## Development

This is a pure HTML/CSS/JavaScript application with no build tools required. To modify:

- Edit `js/main.js` for game logic
- Edit `css/style.css` for styling
- Add new notes by updating the `NOTES` array in `main.js`

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Feel free to submit issues and enhancement requests! 