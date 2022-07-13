#tag BuildAutomation
			Begin BuildStepList Linux
				Begin BuildProjectStep Build
				End
			End
			Begin BuildStepList Mac OS X
				Begin BuildProjectStep Build
				End
				Begin SignProjectStep Sign
				  DeveloperID=
				End
				Begin CopyFilesBuildStep CopyJS
					AppliesTo = 1
					Architecture = 0
					Target = 0
					Destination = 1
					Subdirectory = 
					FolderItem = Li4vZGlzdC9Ub2FzdC5qcw==
				End
			End
			Begin BuildStepList Windows
				Begin BuildProjectStep Build
				End
			End
			Begin BuildStepList Xojo Cloud
				Begin BuildProjectStep Build
				End
			End
#tag EndBuildAutomation
