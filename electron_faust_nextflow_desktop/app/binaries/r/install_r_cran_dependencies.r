# Heavily edited from here:
# https://github.com/dirkschumacher/r-shiny-electron/blob/master/add-cran-binary-pkgs.R

# Script to find dependencies of a pkg list, download binaries and put them
# In the standalone R library.

default_cran_repo_url <- "https://cloud.r-project.org"

default_package_directories_to_remove <- c(
    "help",
    "doc",
    "tests",
    "html",
    "include",
    "unitTests",
    file.path("libs", "*dSYM")
)

installCranDependencies <- function(cran_packages,
                                    library_path,
                                    type,
                                    decompress,
                                    remove_dirs = default_package_directories_to_remove) {
    if (!length(cran_packages)) {
        print("No cran packages were specified to install")
        return(NA)
    }

    previously_installed_libraries <- list.files(library_path)
    requested_packages_to_install <- lapply(cran_packages,
        FUN = function(x) x[[1]]
    )
    requested_packages_to_install <- unlist(requested_packages_to_install)
    detected_cran_packages_to_install <- setdiff(
        requested_packages_to_install,
        previously_installed_libraries
    )
    selected_cran_packages_to_install <- cran_packages[!(requested_packages_to_install %in% previously_installed_libraries)]

    if (length(selected_cran_packages_to_install) == 0) {
        print("All CRAN packages have been already been installed")
        return(NA)
    }

    for (package_to_install in selected_cran_packages_to_install) {
        # print("-------------------------")
        package_name <- package_to_install[[1]]
        package_version <- package_to_install[[2]]
        print(package_name)
        print(package_version)
        if (is.na(package_version)) {
            install.packages(package_name, repos = default_cran_repo_url)
        }
        else {
            install.packages(package_name,
                repos = default_cran_repo_url,
                version = package_version
            )
        }
    }
}
