print("Beginning FAUST Shiny App Deployment")

SHINY_APP_FILE_PATH <- Sys.getenv("FAUST_TOOLS_SHINY_FILE_PATH")
SHINY_APP_URL <- Sys.getenv("FAUST_TOOLS_SHINY_URL")
SHINY_APP_PORT <- as.integer(Sys.getenv("FAUST_TOOLS_SHINY_PORT"))

print(SHINY_APP_FILE_PATH)
print(SHINY_APP_URL)
print(SHINY_APP_PORT)

.libPaths()

library("shiny")

shiny::runApp(
    SHINY_APP_FILE_PATH,
    host = SHINY_APP_URL,
    port = SHINY_APP_PORT,
    launch.browser = FALSE
)
