# Breathe In, Breathe Out

A mindful Tampermonkey userscript that encourages intentional browsing by adding a 15-second timer before accessing distracting websites.

## Features

- **Mindful Access Timer**: Shows a 15-second countdown when visiting configured websites
- **Focus Requirement**: Timer resets if you switch tabs, encouraging present-moment awareness
- **Cooldown System**: Set cooldown periods (5 minutes, 20 minutes, or 2 hours) to avoid repeated timers
- **Customizable Domain List**: Easily configure which websites trigger the timer
- **Clean, Responsive UI**: Modern overlay design that works on all screen sizes

## Installation

1. Install the [Tampermonkey browser extension](https://www.tampermonkey.net/)
2. Copy the contents of `breatheinbreatheout.js`
3. Create a new userscript in Tampermonkey and paste the code
4. Save and enable the script

## Configuration

To customize which websites trigger the timer, edit the `BLOCKED_DOMAINS` array in the script:

```javascript
const BLOCKED_DOMAINS = [
    'reddit.com',
    'facebook.com',
    'twitter.com',
    'youtube.com'
    // Add more domains as needed
];
```

## How It Works

1. When you navigate to a configured website, a timer overlay appears
2. The timer counts down from 15 seconds
3. You must keep the tab in focus - switching tabs resets the timer
4. After completion, you choose a cooldown period
5. During the cooldown, you can access the sites without seeing the timer

## Development

### Testing

This project includes automated tests using Jest and Puppeteer.

#### Setup
```bash
npm install
```

#### Run Tests
```bash
npm test
```

The test suite includes:
- Script loading validation
- Domain detection logic testing
- UI component creation testing

### Project Structure

```
├── breatheinbreatheout.js     # Main userscript
├── FEATURES.md               # Detailed feature documentation
├── tests/
│   ├── breatheinbreatheout.test.js  # Test suite
│   └── test.html             # Test HTML page
├── package.json              # Node.js dependencies and scripts
└── README.md                 # This file
```

## Contributing

We welcome contributions! Here's how to get started:

### Setting Up Development Environment

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/yourusername/breatheinbreatheout.git
   cd breatheinbreatheout
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run tests to ensure everything works**
   ```bash
   npm test
   ```

### Making Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Edit `breatheinbreatheout.js` for script functionality
   - Update `FEATURES.md` if adding new features
   - Add tests in `tests/` directory if needed

3. **Test your changes**
   ```bash
   npm test
   ```

4. **Test manually in browser**
   - Install your modified script in Tampermonkey
   - Visit a blocked domain to test functionality
   - Test focus/blur behavior and cooldown system

### Code Style Guidelines

- Use clean, readable JavaScript with modern ES6+ features
- Add comments for complex logic
- Follow the existing code structure and naming conventions
- Ensure responsive design for UI components

### Submitting Changes

1. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add: description of your changes"
   ```

2. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create a Pull Request**
   - Describe your changes clearly
   - Include any relevant issue numbers
   - Explain how to test your changes

### Types of Contributions

- **Bug fixes**: Fix issues with timer behavior, UI, or domain detection
- **Feature enhancements**: Add new timer options, UI improvements, or domain management features
- **Documentation**: Improve README, add code comments, or update FEATURES.md
- **Testing**: Add new test cases or improve existing tests
- **Performance**: Optimize script performance or reduce memory usage

### Reporting Issues

When reporting bugs or requesting features:

1. Check existing issues first
2. Provide clear reproduction steps
3. Include browser and Tampermonkey version
4. Describe expected vs actual behavior

## License

ISC License - see package.json for details.

## Philosophy

This tool is designed to promote mindful internet usage rather than strict blocking. The 15-second pause creates a moment of awareness, allowing you to consciously choose whether to proceed with your browsing session.
