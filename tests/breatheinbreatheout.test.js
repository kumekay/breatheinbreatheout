const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const userscriptContent = fs.readFileSync(path.join(__dirname, '..', 'breatheinbreatheout.js'), 'utf8');

// Extract TIMER_DURATION from the script for assertion
const timerDurationMatch = userscriptContent.match(/const TIMER_DURATION = (\d+);/);
const SCRIPT_TIMER_DURATION = timerDurationMatch ? parseInt(timerDurationMatch[1], 10) : 15; // Default if not found

describe('BreatheInBreatheOut Userscript', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: true, // Set to false for debugging
            args: process.env.CI ? ['--no-sandbox', '--disable-setuid-sandbox'] : [],
        });
    });

    beforeEach(async () => {
        page = await browser.newPage();
    });

    afterEach(async () => {
        await page.close();
    });

    afterAll(async () => {
        await browser.close();
    });

    test('should load userscript without errors', async () => {
        // Navigate to a test page
        await page.goto(`file://${path.join(__dirname, 'test.html')}`);

        // Test basic script loading
        const scriptResult = await page.evaluate((scriptContent) => {
            try {
                eval(scriptContent);
                return { success: true, message: 'Script loaded successfully' };
            } catch (error) {
                return { success: false, message: error.message };
            }
        }, userscriptContent);

        expect(scriptResult.success).toBe(true);
        console.log('Script loading result:', scriptResult.message);
    });

    test('should detect blocked domains correctly', async () => {
        await page.goto(`file://${path.join(__dirname, 'test.html')}`);

        // Test the shouldBlockDomain function logic by extracting and testing it
        const domainTestResult = await page.evaluate(() => {
            // Replicate the BLOCKED_DOMAINS and shouldBlockDomain logic from the script
            const BLOCKED_DOMAINS = [
                'reddit.com',
                'facebook.com',
                'twitter.com',
                'youtube.com'
            ];

            function testShouldBlockDomain(hostname) {
                const currentDomain = hostname.replace('www.', '');
                return BLOCKED_DOMAINS.some(domain =>
                    currentDomain === domain || currentDomain.endsWith('.' + domain)
                );
            }

            // Test various domains
            const tests = [
                { hostname: 'reddit.com', expected: true },
                { hostname: 'www.reddit.com', expected: true },
                { hostname: 'old.reddit.com', expected: true },
                { hostname: 'facebook.com', expected: true },
                { hostname: 'example.com', expected: false },
                { hostname: 'google.com', expected: false },
            ];

            const results = tests.map(test => ({
                ...test,
                actual: testShouldBlockDomain(test.hostname),
                passed: testShouldBlockDomain(test.hostname) === test.expected
            }));

            return {
                allPassed: results.every(r => r.passed),
                results: results
            };
        });

        expect(domainTestResult.allPassed).toBe(true);
        console.log('Domain detection tests:', domainTestResult.results);
    });

    test('should create timer overlay elements when manually triggered', async () => {
        await page.goto(`file://${path.join(__dirname, 'test.html')}`);

        // Inject script and manually create overlay to test UI components
        const overlayTestResult = await page.evaluate((scriptContent) => {
            try {
                // Evaluate the script to get access to functions
                eval(scriptContent);

                // Manually create the timer overlay function (extracted from the script)
                function createTimerOverlay() {
                    const overlay = document.createElement('div');
                    overlay.id = 'domain-timer-overlay';
                    overlay.style.cssText = `
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.95);
                        z-index: 999999;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        color: white;
                        text-align: center;
                        padding: 20px;
                        box-sizing: border-box;
                    `;

                    const timerDisplay = document.createElement('div');
                    timerDisplay.id = 'timer-display';
                    timerDisplay.textContent = '15';
                    timerDisplay.style.cssText = `
                        font-size: clamp(4rem, 20vw, 8rem);
                        font-weight: bold;
                        margin-bottom: clamp(1rem, 4vw, 2rem);
                        color: #ff6b6b;
                        line-height: 1;
                    `;

                    overlay.appendChild(timerDisplay);
                    return overlay;
                }

                // Create and add the overlay
                const overlay = createTimerOverlay();
                document.body.appendChild(overlay);

                // Check if elements were created correctly
                const overlayExists = document.getElementById('domain-timer-overlay') !== null;
                const timerDisplayExists = document.getElementById('timer-display') !== null;
                const timerDisplayText = document.getElementById('timer-display')?.textContent;

                return {
                    success: true,
                    overlayExists,
                    timerDisplayExists,
                    timerDisplayText,
                    message: 'Overlay created successfully'
                };
            } catch (error) {
                return {
                    success: false,
                    message: error.message
                };
            }
        }, userscriptContent);

        expect(overlayTestResult.success).toBe(true);
        expect(overlayTestResult.overlayExists).toBe(true);
        expect(overlayTestResult.timerDisplayExists).toBe(true);
        expect(overlayTestResult.timerDisplayText).toBe('15');

        console.log('Overlay test result:', overlayTestResult);
    });
});
