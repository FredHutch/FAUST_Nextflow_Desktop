#!/usr/bin/env Rscript

# Taken from here
# https://github.com/dirkschumacher/r-shiny-electron/blob/master/add-cran-binary-pkgs.R

source("install_r_cran_dependencies.r")

cran_packages_to_install <- c(
    "BiocManager",
    "callr",
    "cowplot",
    "dplyr",
    "DT",
    "foreach",
    "gridExtra",
    "ggplotify",
    "heatmaply",
    "plotly",
    "rChoiceDialogs",
    "shiny",
    "shinyalert",
    "shinycssloaders",
    "shinyjs",
    "shinyFiles",
    "shinyWidgets",
    "tidyr"
)

bioc_packages_to_install <- c(
    "flowWorkspace",
    "flowCore"
)
# github_packages_to_install <- c(
#     # TODO
# )

# cran_packages <- setdiff(
#     unique(cran_packages_to_install),
# )

if (dir.exists("r-mac")) {
    print("==================================================================");
    print("Installing OSX Specific Dependencies")
    print("==================================================================");
    install_cran_dependencies(cran_packages = cran_packages_to_install,
                              library_path = file.path("r-mac", "library"),
                              type = "mac.binary.el-capitan", decompress = untar)
    # Install bioc dependencies
    # Install github dependencies
}

if (dir.exists("r-win")) {
    print("==================================================================");
    print("Installing Windows Specific Dependencies")
    print("==================================================================");
    install_cran_dependencies(cran_packages = cran_packages_to_install,
                              library_path = file.path("r-win", "library"),
                              type = "win.binary", decompress = unzip)
    # Install bioc dependencies
    # Install github dependencies
}
