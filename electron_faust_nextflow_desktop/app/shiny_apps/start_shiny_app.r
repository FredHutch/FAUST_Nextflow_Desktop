library("shiny")
print("THIS IS WHERE I WOULD START SHINY")


# runApp("./faust_tools/inst/FAUSTApp/app.R")
# print(normalizePath(getwd()))
# "/Users/lknecht/Repositories/FAUST_Nextflow_Desktop/electron_faust_nextflow_desktop"
faust_shiny_app_file_path <- file.path(getwd(), "app", "shiny_apps", "faust_tools", "inst", "FAUSTApp", "app.R")
# faust_shiny_app_file_path <- file.path(getwd(), "app", "shiny_apps", "debug_server", "app.R")
print(faust_shiny_app_file_path)
# SHINY_PORT
runApp(faust_shiny_app_file_path, port = 10005)

