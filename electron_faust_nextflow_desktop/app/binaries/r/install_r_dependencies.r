#!/usr/bin/env Rscript

# Taken from here
# https://github.com/dirkschumacher/r-shiny-electron/blob/master/add-cran-binary-pkgs.R

source("install_r_biocmanager_dependencies.r")
source("install_r_cran_dependencies.r")

cran_packages_to_install <- list(
    list("BiocManager", NA),
    list("callr", NA),
    list("cowplot", NA),
    list("dplyr", NA),
    list("digest", NA),
    list("DT", NA),
    list("fastmap", NA),
    list("foreach", NA),
    list("gridExtra", NA),
    list("ggplotify", NA),
    list("heatmaply", NA),
    list("htmltools", NA),
    list("httpuv", NA),
    list("later", NA),
    list("magrittr", NA),
    list("mime", NA),
    list("plotly", NA),
    list("promises", NA),
    list("R6", NA),
    list("rChoiceDialogs", NA),
    list("Rcpp", NA),
    list("rlang", NA),
    list("shiny", NA),
    list("shinyalert", NA),
    list("shinycssloaders", NA),
    list("shinyjs", NA),
    list("shinyFiles", NA),
    list("shinyWidgets", NA),
    list("tidyr", NA),
    list("xtable", NA)
)

bioc_packages_to_install <- list(
    list("flowCore", "3.10"),
    list("flowWorkspace", "3.10")
)
# github_packages_to_install <- c(
#     # TODO
# )

# TODO: Convert type to be enum
if (dir.exists("r-mac")) {
    print("==================================================================");
    print("Installing OSX Specific Dependencies")
    print("==================================================================");
    print("Installing required CRAN dependencies")
    installCranDependencies(cran_packages = cran_packages_to_install,
                            library_path = file.path("r-mac", "library"),
                            type = "mac.binary.el-capitan",
                            decompress = untar)
    print("Installing required BiocManager dependencies")
    installBiocmanagerDependencies(packages = bioc_packages_to_install,
                                   library_path = file.path("r-mac", "library"),
                                   type = "mac.binary.el-capitan",
                                   decompress = untar)
    # Install github dependencies
}

if (dir.exists("r-win")) {
    print("==================================================================");
    print("Installing Windows Specific Dependencies")
    print("==================================================================");
    print("Installing required CRAN dependencies")
    installCranDependencies(cran_packages = cran_packages_to_install,
                            library_path = file.path("r-win", "library"),
                            type = "win.binary",
                            decompress = unzip)
    # Install bioc dependencies
    # Install github dependencies
}
