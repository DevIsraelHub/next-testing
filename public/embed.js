;(() => {
  // Find the script tag that loaded this script
  var currentScript = document.currentScript
  var embedId = currentScript.getAttribute("data-embed-id")

  // Create the embedded content
  var embedContent = document.createElement("div")
  embedContent.innerHTML = `
    <div style="background-color: #f0f0f0; border-radius: 8px; padding: 16px; font-family: Arial, sans-serif;">
      <h2 style="margin: 0 0 8px 0; color: #333;">Embedded Content</h2>
      <p style="margin: 0; color: #666;">This is the embedded content for ID: ${embedId}</p>
    </div>
  `

  // Find the container element or create one if it doesn't exist
  var container = document.getElementById("embed-content") || document.body
  container.appendChild(embedContent)
})()

